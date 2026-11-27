import { describe, it, expect } from 'vitest'
import { resumirCategorias, contarServiciosPorCategoria } from './categorias'

const CATEGORIAS = [
  { id: '1', nombre: 'Consultas', slug: 'consultas', icono: '🩺' },
  { id: '2', nombre: 'Vacunación', slug: 'vacunacion', icono: '💉' },
  { id: '7', nombre: 'Peluquería', slug: 'peluqueria', icono: '✂️' },
]

const SERVICIOS = [
  { id: '1', categoriaId: '1', precio: 15000 },
  { id: '2', categoriaId: '1', precio: 25000 },
  { id: '6', categoriaId: '2', precio: 12000 },
]

describe('categorias', () => {
  it('resume solo las categorías con servicios, con su cantidad y precio más bajo', () => {
    const resumen = resumirCategorias(SERVICIOS, CATEGORIAS)

    expect(resumen).toHaveLength(2) // Peluquería no tiene servicios
    expect(resumen[0]).toMatchObject({ nombre: 'Consultas', cantidad: 2, precioDesde: 15000, icono: '🩺' })
    expect(resumen[1]).toMatchObject({ slug: 'vacunacion', cantidad: 1, precioDesde: 12000 })
  })

  it('cuenta los servicios de cada categoría por id', () => {
    expect(contarServiciosPorCategoria(SERVICIOS)).toEqual({ 1: 2, 2: 1 })
  })
})
