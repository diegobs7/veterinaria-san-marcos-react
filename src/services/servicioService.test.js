import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock del generador de códigos para no depender de utils/codigos
vi.mock('../utils/codigos', () => ({
  generarCodigo: vi.fn((categoria, lista) => {
    const n = (lista?.length || 0) + 1
    return `TS${String(n).padStart(3, '0')}`
  }),
}))

// Mock de los datos iniciales para pruebas controladas
vi.mock('../data/Servicios.json', () => ({
  default: [
    {
      id: 'sv001',
      codigo: 'SV001',
      categoria: 'Consultas',
      titulo: 'Consulta general',
      especie: 'Perro / Gato',
      duracion: '30 min',
      precio: 15000,
      descripcion: 'Revisión',
      incluye: [],
      observaciones: null,
    },
  ],
}))

import {
  listarServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  restablecerServicios,
} from './servicioService'

describe('servicioService', () => {
  beforeEach(() => {
    localStorage.clear()
    restablecerServicios()
  })

  it('lista los servicios iniciales cuando no hay datos guardados', () => {
    const lista = listarServicios()
    expect(lista.length).toBeGreaterThan(0)
    expect(lista[0].titulo).toBe('Consulta general')
  })

  it('obtiene un servicio por id', () => {
    const lista = listarServicios()
    const primero = lista[0]
    const encontrado = obtenerServicio(primero.id)
    expect(encontrado).toEqual(primero)
    expect(obtenerServicio('no-existe')).toBeNull()
  })

  it('crea un servicio nuevo y lo persiste', () => {
    const nuevo = crearServicio({
      titulo: 'Baño medicado',
      descripcion: 'Higiene especial',
      categoria: 'Otros',
      especie: 'Perro',
      duracion: '45 min',
      precio: 12000,
    })

    expect(nuevo.id).toBeTruthy()
    expect(nuevo.titulo).toBe('Baño medicado')
    expect(nuevo.categoria).toBe('Otros')

    const lista = listarServicios()
    expect(lista.some((s) => s.id === nuevo.id)).toBe(true)
  })

  it('actualiza un servicio existente', () => {
    const lista = listarServicios()
    const id = lista[0].id

    const actualizado = actualizarServicio(id, { titulo: 'Consulta actualizada', precio: 20000 })
    expect(actualizado.titulo).toBe('Consulta actualizada')
    expect(actualizado.precio).toBe(20000)
    expect(obtenerServicio(id).titulo).toBe('Consulta actualizada')
  })

  it('lanza error al actualizar un id inexistente', () => {
    expect(() => actualizarServicio('id-falso', { titulo: 'X' })).toThrow()
  })

  it('elimina un servicio', () => {
    const lista = listarServicios()
    const id = lista[0].id
    eliminarServicio(id)
    expect(obtenerServicio(id)).toBeNull()
  })
})