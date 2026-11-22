import { describe, it, expect } from 'vitest'
import { obtenerMensajeError } from './apiErrores'

describe('obtenerMensajeError', () => {
  it('caso 1: usa el mensaje que envía el backend', () => {
    const error = { response: { status: 401, data: { status: 401, message: 'Credenciales incorrectas' } } }
    expect(obtenerMensajeError(error)).toBe('Credenciales incorrectas')
  })

  it('caso 1: si la respuesta no trae mensaje, indica el estado', () => {
    const error = { response: { status: 500, data: null } }
    expect(obtenerMensajeError(error)).toContain('500')
  })

  it('caso 2: tiempo de espera agotado', () => {
    expect(obtenerMensajeError({ code: 'ECONNABORTED' })).toContain('tardó demasiado')
  })

  it('caso 3: sin respuesta (backend apagado, red o CORS)', () => {
    expect(obtenerMensajeError(new Error('Network Error'))).toContain('No fue posible contactar la API')
  })
})