import { describe, it, expect, vi, beforeEach } from 'vitest'

// Se simula la API: estas pruebas no necesitan el backend encendido
vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))

import { api } from './api'
import {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from './categoriaService'

// Así responde el backend (id numérico)
const VACUNACION = { id: 2, nombre: 'Vacunación', slug: 'vacunacion', icono: '💉', descripcion: 'Vacunas' }
const CIRUGIA = { id: 3, nombre: 'Cirugía', slug: 'cirugia', icono: '🏥', descripcion: null }

// Error como lo entrega Axios cuando el backend responde con un código de error
function errorHttp(status, message) {
  return { response: { status, data: { message } } }
}

describe('categoriaService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lista las categorías ordenadas por nombre y con el id como texto', async () => {
    api.get.mockResolvedValue({ data: [VACUNACION, CIRUGIA] })

    const lista = await listarCategorias()

    expect(api.get).toHaveBeenCalledWith('/categorias')
    expect(lista.map((c) => c.nombre)).toEqual(['Cirugía', 'Vacunación'])
    expect(lista[0].id).toBe('3')
    expect(lista[0].descripcion).toBe('') // null del backend → texto vacío
  })

  it('obtiene una categoría por id', async () => {
    api.get.mockResolvedValue({ data: VACUNACION })

    const categoria = await obtenerCategoria('2')

    expect(api.get).toHaveBeenCalledWith('/categorias/2')
    expect(categoria.slug).toBe('vacunacion')
  })

  it('devuelve null si la categoría no existe (404)', async () => {
    api.get.mockRejectedValue(errorHttp(404, 'Categoría no encontrada'))

    expect(await obtenerCategoria('99')).toBeNull()
  })

  it('crea una categoría enviando solo nombre, icono y descripción', async () => {
    api.post.mockResolvedValue({ data: { ...CIRUGIA, id: 7, nombre: 'Peluquería', slug: 'peluqueria' } })

    const nueva = await crearCategoria({ nombre: '  Peluquería ', icono: '✂️', descripcion: '' })

    expect(api.post).toHaveBeenCalledWith('/categorias', {
      nombre: 'Peluquería',
      icono: '✂️',
      descripcion: null,
    })
    expect(nueva.id).toBe('7')
  })

  it('muestra el mensaje del backend cuando el nombre ya existe (409)', async () => {
    api.post.mockRejectedValue(errorHttp(409, 'Ya existe una categoría con ese nombre'))

    await expect(crearCategoria({ nombre: 'Cirugia' })).rejects.toThrow(
      'Ya existe una categoría con ese nombre',
    )
  })

  it('actualiza una categoría', async () => {
    api.put.mockResolvedValue({ data: { ...CIRUGIA, nombre: 'Cirugía mayor' } })

    const actualizada = await actualizarCategoria('3', { nombre: 'Cirugía mayor' })

    expect(api.put).toHaveBeenCalledWith('/categorias/3', expect.objectContaining({ nombre: 'Cirugía mayor' }))
    expect(actualizada.nombre).toBe('Cirugía mayor')
  })

  it('elimina una categoría', async () => {
    api.delete.mockResolvedValue({})

    await eliminarCategoria('3')

    expect(api.delete).toHaveBeenCalledWith('/categorias/3')
  })

  it('no elimina una categoría con servicios: muestra el 409 del backend', async () => {
    api.delete.mockRejectedValue(errorHttp(409, 'No se puede eliminar una categoría que tiene servicios'))

    await expect(eliminarCategoria('2')).rejects.toThrow(
      'No se puede eliminar una categoría que tiene servicios',
    )
  })
})
