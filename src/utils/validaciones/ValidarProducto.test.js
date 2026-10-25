import { describe, it, expect } from 'vitest'
import validarProducto, { validarPrecio, validarStock, validarStockCritico } from './ValidarProducto'

const VALIDOS = {
  nombre: 'Consulta general',
  descripcion: '',
  precio: '15000',
  stock: '10',
  stockCritico: '',
  categoria: 'Consultas',
  especie: 'Perro / Gato',
  duracion: '30 min',
}

describe('validarPrecio', () => {
  it('acepta 0 o más y rechaza vacío, negativos y texto', () => {
    expect(validarPrecio('0')).toBe('')
    expect(validarPrecio('15000')).toBe('')
    expect(validarPrecio('')).not.toBe('')
    expect(validarPrecio('-1')).not.toBe('')
    expect(validarPrecio('abc')).not.toBe('')
  })
})

describe('validarStock', () => {
  it('exige un entero igual o mayor a 0', () => {
    expect(validarStock('0')).toBe('')
    expect(validarStock('25')).toBe('')
    expect(validarStock('')).not.toBe('')
    expect(validarStock('1.5')).not.toBe('')
    expect(validarStock('-3')).not.toBe('')
  })
})

describe('validarStockCritico', () => {
  it('es opcional, pero si se ingresa debe ser un entero', () => {
    expect(validarStockCritico('')).toBe('')
    expect(validarStockCritico('5')).toBe('')
    expect(validarStockCritico('2.5')).not.toBe('')
  })
})

describe('validarProducto', () => {
  it('no devuelve errores con datos válidos (descripción y stock crítico son opcionales)', () => {
    expect(validarProducto(VALIDOS)).toEqual({})
  })

  it('marca solo los campos con problemas', () => {
    const errores = validarProducto({ ...VALIDOS, nombre: '', categoria: '', precio: '-5' })
    expect(Object.keys(errores).sort()).toEqual(['categoria', 'nombre', 'precio'])
  })

  it('rechaza un nombre de más de 100 caracteres', () => {
    expect(validarProducto({ ...VALIDOS, nombre: 'a'.repeat(101) }).nombre).toBeDefined()
  })
})
