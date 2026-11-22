import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { registrarEvaluacion, listarEvaluaciones } from './evaluacionService'

describe('evaluacionService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-22T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const evaluacion = {
    calificacion: 5,
    comentario: 'Muy buena atención',
    correo: 'cliente@duocuc.cl',
  }

  it('devuelve una lista vacía si no hay evaluaciones guardadas', () => {
    expect(listarEvaluaciones()).toEqual([])
  })

  it('guarda la evaluación con id y fecha', () => {
    const guardada = registrarEvaluacion(evaluacion)

    expect(guardada.calificacion).toBe(5)
    expect(guardada.comentario).toBe('Muy buena atención')
    expect(guardada.correo).toBe('cliente@duocuc.cl')
    expect(guardada.id).toBe(`ev${Date.now()}`)
    expect(guardada.fecha).toBe('2026-11-22T12:00:00.000Z')
  })

  it('la evaluación queda en localStorage y aparece en el listado', () => {
    registrarEvaluacion(evaluacion)

    const lista = listarEvaluaciones()
    expect(lista).toHaveLength(1)
    expect(lista[0].comentario).toBe('Muy buena atención')
    expect(JSON.parse(localStorage.getItem('evaluaciones'))).toHaveLength(1)
  })

  it('agrega las evaluaciones nuevas sin borrar las anteriores', () => {
    registrarEvaluacion(evaluacion)
    registrarEvaluacion({ calificacion: 3, comentario: '', correo: null })

    const lista = listarEvaluaciones()
    expect(lista).toHaveLength(2)
    expect(lista[1].calificacion).toBe(3)
    expect(lista[1].correo).toBeNull()
  })

  it('devuelve una lista vacía si los datos guardados están dañados', () => {
    localStorage.setItem('evaluaciones', 'esto no es JSON')

    expect(listarEvaluaciones()).toEqual([])
  })
})