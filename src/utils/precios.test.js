import { describe, it, expect } from 'vitest'
import { formatearPrecio, calcularPrecioFinal } from './precios'

describe('formatearPrecio', () => {
  it('agrega el símbolo $ y el separador de miles', () => {
    expect(formatearPrecio(15000)).toBe('$15.000')
  })
})

describe('calcularPrecioFinal', () => {
  
  const consultaUrgencia = { codigo: 'SV002', precio: 25000 }
  const consultaGeneral = { codigo: 'SV001', precio: 15000 }

  it('suma $10.000 a la consulta de urgencia fuera de horario', () => {
    expect(calcularPrecioFinal(consultaUrgencia, { fueraDeHorario: true })).toBe(35000)
  })

  it('mantiene el precio base de la urgencia dentro del horario', () => {
    expect(calcularPrecioFinal(consultaUrgencia)).toBe(25000)
  })

  it('no aplica recargo a otros servicios aunque sea fuera de horario', () => {
    expect(calcularPrecioFinal(consultaGeneral, { fueraDeHorario: true })).toBe(15000)
  })
})