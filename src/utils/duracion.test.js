import { describe, it, expect } from 'vitest'
import { duracionEnMinutos } from './duracion'

describe('duracionEnMinutos', () => {
    it('convierte los minutos del catálogo a número', () => {
        expect(duracionEnMinutos('30 min')).toBe(30)
        expect(duracionEnMinutos('120 min')).toBe(120)
    })

    it('convierte las horas a minutos', () => {
        expect(duracionEnMinutos('24 h')).toBe(1440)
    })

    it('devuelve 0 si la duración no tiene un formato conocido', () => {
        expect(duracionEnMinutos('')).toBe(0)
        expect(duracionEnMinutos(undefined)).toBe(0)
        expect(duracionEnMinutos('media hora')).toBe(0)
    })
})