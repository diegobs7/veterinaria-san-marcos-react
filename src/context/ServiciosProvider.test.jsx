import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ServiciosProvider } from './ServiciosProvider'
import { useServicios } from '../Hooks/useServicios'

vi.mock('../services/servicioService', () => ({
  listarServicios: vi.fn(),
  crearServicio: vi.fn(),
  actualizarServicio: vi.fn(),
  eliminarServicio: vi.fn(),
}))

import * as servicioService from '../services/servicioService'

const VA001 = {
  id: '6',
  codigo: 'VA001',
  titulo: 'Vacuna antirrábica canina',
  categoriaId: '2',
  precio: 12000,
  descuento: 10,
  incluye: ['Aplicación de la vacuna.'],
}

// Componente de prueba: muestra lo que entrega el Context y tiene un botón por acción
function Consumidor() {
  const { servicios, cargando, error, obtener, crear, actualizar, eliminar } = useServicios()
  return (
    <div>
      <p data-testid="estado">{cargando ? 'cargando' : error || 'listo'}</p>
      <p data-testid="total">{servicios.length}</p>
      <p data-testid="obtener">{obtener(6)?.titulo ?? 'no-encontrado'}</p>
      <button type="button" onClick={() => crear({ titulo: 'Vacuna de prueba' })}>crear</button>
      <button type="button" onClick={() => actualizar('6', { precio: 13000 })}>actualizar</button>
      <button type="button" onClick={() => eliminar('6')}>eliminar</button>
    </div>
  )
}

function dibujar() {
  return render(
    <ServiciosProvider>
      <Consumidor />
    </ServiciosProvider>,
  )
}

// Espera a que termine la carga inicial
async function esperarCarga() {
  await waitFor(() => expect(screen.getByTestId('estado')).toHaveTextContent('listo'))
}

describe('ServiciosProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    servicioService.listarServicios.mockResolvedValue([VA001])
  })

  it('muestra "cargando" y luego los servicios que entrega el backend', async () => {
    dibujar()

    expect(screen.getByTestId('estado')).toHaveTextContent('cargando')
    await esperarCarga()
    expect(screen.getByTestId('total')).toHaveTextContent('1')
  })

  it('obtiene un servicio por id aunque llegue como número', async () => {
    dibujar()
    await esperarCarga()

    expect(screen.getByTestId('obtener')).toHaveTextContent('Vacuna antirrábica canina')
  })

  it('guarda el mensaje de error si el backend no responde', async () => {
    servicioService.listarServicios.mockRejectedValue(new Error('No fue posible contactar la API.'))

    dibujar()

    await waitFor(() =>
      expect(screen.getByTestId('estado')).toHaveTextContent('No fue posible contactar la API.'),
    )
  })

  it('al crear, recarga la lista desde el backend', async () => {
    dibujar()
    await esperarCarga()

    servicioService.crearServicio.mockResolvedValue({ ...VA001, id: '32' })
    servicioService.listarServicios.mockResolvedValue([VA001, { ...VA001, id: '32' }])
    fireEvent.click(screen.getByText('crear'))

    await waitFor(() => expect(screen.getByTestId('total')).toHaveTextContent('2'))
  })

  it('al actualizar, conserva lo que el formulario no edita (descuento e incluye)', async () => {
    dibujar()
    await esperarCarga()

    servicioService.actualizarServicio.mockResolvedValue({ ...VA001, precio: 13000 })
    fireEvent.click(screen.getByText('actualizar'))

    await waitFor(() =>
      expect(servicioService.actualizarServicio).toHaveBeenCalledWith(
        '6',
        expect.objectContaining({ precio: 13000, descuento: 10, incluye: ['Aplicación de la vacuna.'] }),
      ),
    )
  })

  it('al eliminar, recarga la lista desde el backend', async () => {
    dibujar()
    await esperarCarga()

    servicioService.eliminarServicio.mockResolvedValue()
    servicioService.listarServicios.mockResolvedValue([])
    fireEvent.click(screen.getByText('eliminar'))

    await waitFor(() => expect(screen.getByTestId('total')).toHaveTextContent('0'))
    expect(servicioService.eliminarServicio).toHaveBeenCalledWith('6')
  })
})
