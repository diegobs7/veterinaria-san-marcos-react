import { describe, it, expect, beforeEach, vi } from 'vitest'

// Evitar dependencia real de servicios al contar/eliminar
vi.mock('./servicioService', () => ({
  listarServicios: vi.fn(() => []),
}))

import {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  restablecerCategorias,
  contarServiciosPorCategoria,
} from './categoriaService'
import { listarServicios } from './servicioService'

describe('categoriaService', () => {
  beforeEach(() => {
    localStorage.clear()
    restablecerCategorias()
    vi.mocked(listarServicios).mockReturnValue([])
  })

  it('lista las categorías iniciales (seed)', () => {
    const lista = listarCategorias()
    expect(lista.length).toBeGreaterThanOrEqual(6)
    expect(lista.some((c) => c.nombre === 'Consultas')).toBe(true)
  })

  it('crea una categoría nueva', () => {
    const nueva = crearCategoria({
      nombre: 'Fisioterapia',
      icono: '🦴',
      descripcion: 'Rehabilitación',
    })

    expect(nueva.id).toMatch(/^cat-/)
    expect(nueva.nombre).toBe('Fisioterapia')
    expect(nueva.icono).toBe('🦴')
    expect(listarCategorias().some((c) => c.id === nueva.id)).toBe(true)
  })

  it('no permite nombres duplicados al crear', () => {
    expect(() => crearCategoria({ nombre: 'Consultas' })).toThrow(/Ya existe/)
  })

  it('actualiza una categoría existente', () => {
    const lista = listarCategorias()
    const id = lista[0].id
    const actualizada = actualizarCategoria(id, {
      nombre: lista[0].nombre,
      icono: '✨',
      descripcion: 'Nueva desc',
    })
    expect(actualizada.icono).toBe('✨')
    expect(obtenerCategoria(id).descripcion).toBe('Nueva desc')
  })

  it('elimina una categoría sin servicios asociados', () => {
    const creada = crearCategoria({ nombre: 'Temporal', icono: '🐾' })
    expect(eliminarCategoria(creada.id)).toBe(true)
    expect(obtenerCategoria(creada.id)).toBeNull()
  })

  it('no elimina una categoría con servicios asociados', () => {
    vi.mocked(listarServicios).mockReturnValue([
      { id: 's1', categoria: 'Consultas', titulo: 'X' },
    ])

    const consultas = listarCategorias().find((c) => c.nombre === 'Consultas')
    expect(() => eliminarCategoria(consultas.id)).toThrow(/No se puede eliminar/)
  })

  it('cuenta servicios por categoría', () => {
    vi.mocked(listarServicios).mockReturnValue([
      { categoria: 'Consultas' },
      { categoria: 'Consultas' },
      { categoria: 'Cirugía' },
    ])
    const conteo = contarServiciosPorCategoria()
    expect(conteo.Consultas).toBe(2)
    expect(conteo['Cirugía']).toBe(1)
  })
})