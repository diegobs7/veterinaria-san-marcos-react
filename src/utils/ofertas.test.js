import { describe, it, expect } from 'vitest'
import { estaEnOferta, precioFinal, obtenerOfertas } from './ofertas'

const CON_OFERTA = { id: '6', precio: 12000, descuento: 10 }
const SIN_OFERTA = { id: '1', precio: 15000, descuento: null }

describe('ofertas', () => {
  it('un servicio está en oferta solo si tiene un descuento mayor a 0', () => {
    expect(estaEnOferta(CON_OFERTA)).toBe(true)
    expect(estaEnOferta(SIN_OFERTA)).toBe(false)
    expect(estaEnOferta({ precio: 1000, descuento: 0 })).toBe(false)
  })

  it('el precio final aplica el descuento solo a los servicios en oferta', () => {
    expect(precioFinal(CON_OFERTA)).toBe(10800)
    expect(precioFinal(SIN_OFERTA)).toBe(15000)
  })

  it('obtiene solo los servicios en oferta', () => {
    expect(obtenerOfertas([CON_OFERTA, SIN_OFERTA])).toEqual([CON_OFERTA])
  })
})
