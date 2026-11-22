import { describe, it, expect } from 'vitest'
import { normalizarRut } from './rut'

describe('normalizarRut', () => {
    it('quita puntos y espacios y pasa la K a mayúscula', () => {
        expect(normalizarRut('12.345.678-k')).toBe('12345678-K')
        expect(normalizarRut(' 7.654.321-0 ')).toBe('7654321-0')
    })

    it('el mismo RUT escrito de distintas formas queda igual', () => {
        expect(normalizarRut('12.345.678-5')).toBe(normalizarRut('12345678-5'))
    })

    it('devuelve texto vacío si no hay RUT', () => {
        expect(normalizarRut(undefined)).toBe('')
        expect(normalizarRut('')).toBe('')
    })
})