import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { CategoriasProvider } from './CategoriasProvider'
import { useCategorias } from '../Hooks/useCategorias'

vi.mock('../services/categoriaService', () => ({
  listarCategorias: vi.fn(),
  crearCategoria: vi.fn(),
  actualizarCategoria: vi.fn(),
  eliminarCategoria: vi.fn(),
}))

import * as categoriaService from '../services/categoriaService'

const VACUNACION = { id: '2', nombre: 'Vacunación', slug: 'vacunacion', icono: '💉', descripcion: '' }

// Componente de prueba: muestra lo que entrega el Context y tiene un botón por acción
function Consumidor() {
  const { categorias, cargando, error, obtener, crear, actualizar, eliminar } = useCategorias()
  return (
    <div>
      <p data-testid="estado">{cargando ? 'cargando' : error || 'listo'}</p>
      <p data-testid="total">{categorias.length}</p>
      <p data-testid="obtener">{obtener(2)?.nombre ?? 'no-encontrada'}</p>
      <button type="button" onClick={() => crear({ nombre: 'Peluquería' })}>crear</button>
      <button type="button" onClick={() => actualizar('2', { nombre: 'Vacunas' })}>actualizar</button>
      <button type="button" onClick={() => eliminar('2').catch(() => {})}>eliminar</button>
    </div>
  )
}

function dibujar() {
  return render(
    <CategoriasProvider>
      <Consumidor />
    </CategoriasProvider>,
  )
}

async function esperarCarga() {
  await waitFor(() => expect(screen.getByTestId('estado')).toHaveTextContent('listo'))
}

describe('CategoriasProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    categoriaService.listarCategorias.mockResolvedValue([VACUNACION])
  })

  it('carga las categorías del backend y las busca por id', async () => {
    dibujar()

    expect(screen.getByTestId('estado')).toHaveTextContent('cargando')
    await esperarCarga()
    expect(screen.getByTestId('total')).toHaveTextContent('1')
    expect(screen.getByTestId('obtener')).toHaveTextContent('Vacunación')
  })

  it('guarda el mensaje de error si el backend no responde', async () => {
    categoriaService.listarCategorias.mockRejectedValue(new Error('No fue posible contactar la API.'))

    dibujar()

    await waitFor(() =>
      expect(screen.getByTestId('estado')).toHaveTextContent('No fue posible contactar la API.'),
    )
  })

  it('al crear o actualizar, recarga la lista desde el backend', async () => {
    dibujar()
    await esperarCarga()

    categoriaService.crearCategoria.mockResolvedValue({ id: '7', nombre: 'Peluquería' })
    categoriaService.listarCategorias.mockResolvedValue([VACUNACION, { id: '7', nombre: 'Peluquería' }])
    fireEvent.click(screen.getByText('crear'))
    await waitFor(() => expect(screen.getByTestId('total')).toHaveTextContent('2'))

    categoriaService.actualizarCategoria.mockResolvedValue({ ...VACUNACION, nombre: 'Vacunas' })
    categoriaService.listarCategorias.mockResolvedValue([{ ...VACUNACION, nombre: 'Vacunas' }])
    fireEvent.click(screen.getByText('actualizar'))
    await waitFor(() => expect(screen.getByTestId('obtener')).toHaveTextContent('Vacunas'))
  })

  it('si el backend rechaza eliminar (409), la categoría sigue en la lista', async () => {
    dibujar()
    await esperarCarga()

    categoriaService.eliminarCategoria.mockRejectedValue(
      new Error('No se puede eliminar una categoría que tiene servicios'),
    )
    fireEvent.click(screen.getByText('eliminar'))

    await waitFor(() => expect(categoriaService.eliminarCategoria).toHaveBeenCalledWith('2'))
    expect(screen.getByTestId('total')).toHaveTextContent('1')
  })
})
