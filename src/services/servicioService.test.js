import { describe, it, expect, vi, beforeEach } from 'vitest'

// Se simula la API: estas pruebas no necesitan el backend encendido
vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))

import { api } from './api'
import {
  listarServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from './servicioService'

// Así responde el backend
const VA001_BACKEND = {
  id: 6,
  codigo: 'VA001',
  titulo: 'Vacuna antirrábica canina',
  categoriaId: 2,
  categoria: 'Vacunación',
  categoriaSlug: 'vacunacion',
  especie: 'Perro',
  duracion: '10 min',
  precio: 12000,
  descuento: 10,
  observaciones: 'Obligatoria por ley',
  descripcion: 'Protege contra la rabia.',
  incluye: ['Aplicación de la vacuna.'],
}

// Así llegan los datos desde el formulario del admin (ids como texto)
const FORMULARIO = {
  titulo: ' Vacuna de prueba ',
  categoriaId: '2',
  especie: 'Perro',
  duracion: '10 min',
  precio: '10000',
  descripcion: 'Servicio de prueba',
}

function errorHttp(status, message) {
  return { response: { status, data: { message } } }
}

describe('servicioService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lista los servicios con los nombres que usan las páginas', async () => {
    api.get.mockResolvedValue({ data: [VA001_BACKEND] })

    const [servicio] = await listarServicios()

    expect(api.get).toHaveBeenCalledWith('/servicios')
    expect(servicio).toMatchObject({
      id: '6',
      codigo: 'VA001',
      categoria: 'Vacunación',
      categoriaId: '2',
      descuento: 10,
    })
  })

  it('obtiene un servicio por id', async () => {
    api.get.mockResolvedValue({ data: VA001_BACKEND })

    const servicio = await obtenerServicio('6')

    expect(api.get).toHaveBeenCalledWith('/servicios/6')
    expect(servicio.titulo).toBe('Vacuna antirrábica canina')
  })

  it('devuelve null si el servicio no existe (404)', async () => {
    api.get.mockRejectedValue(errorHttp(404, 'Servicio no encontrado'))

    expect(await obtenerServicio('999')).toBeNull()
  })

  it('crea un servicio convirtiendo los textos del formulario a números', async () => {
    api.post.mockResolvedValue({ data: { ...VA001_BACKEND, id: 32, codigo: 'VA007', descuento: null } })

    const nuevo = await crearServicio(FORMULARIO)

    expect(api.post).toHaveBeenCalledWith('/servicios', {
      titulo: 'Vacuna de prueba',
      categoriaId: 2,
      especie: 'Perro',
      duracion: '10 min',
      precio: 10000,
      descuento: null,
      observaciones: null,
      descripcion: 'Servicio de prueba',
      incluye: [],
    })
    expect(nuevo.codigo).toBe('VA007') // el código lo genera el backend
  })

  it('muestra el mensaje del backend cuando el nombre se repite en la categoría (409)', async () => {
    api.post.mockRejectedValue(errorHttp(409, 'Ya existe un servicio con ese nombre en la categoría'))

    await expect(crearServicio(FORMULARIO)).rejects.toThrow(
      'Ya existe un servicio con ese nombre en la categoría',
    )
  })

  it('actualiza un servicio enviando también el descuento y lo que incluye', async () => {
    api.put.mockResolvedValue({ data: { ...VA001_BACKEND, precio: 13000 } })

    await actualizarServicio('6', { ...VA001_BACKEND, categoriaId: '2', precio: 13000 })

    expect(api.put).toHaveBeenCalledWith(
      '/servicios/6',
      expect.objectContaining({ precio: 13000, descuento: 10, incluye: ['Aplicación de la vacuna.'] }),
    )
  })

  it('elimina un servicio', async () => {
    api.delete.mockResolvedValue({})

    await eliminarServicio('6')

    expect(api.delete).toHaveBeenCalledWith('/servicios/6')
  })

  it('avisa cuando el backend no responde', async () => {
    api.get.mockRejectedValue({ code: 'ECONNABORTED' })

    await expect(listarServicios()).rejects.toThrow('La API tardó demasiado')
  })
})
