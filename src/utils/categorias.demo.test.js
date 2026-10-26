import { describe, it, expect } from 'vitest'
import { crearSlug } from './categorias'

describe('crearSlug', () => {
    it('quita las tildes y cambia los espacios por guiones', () => {
    expect(crearSlug('Cirugía mayor')).toBe('cirugia mayor')
    })
})
