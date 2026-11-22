import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { registrarMensajeContacto, listarMensajesContacto } from './contactoService'

describe('contactoService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-22T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const mensaje = {
    nombre: 'Ana Pérez',
    correo: 'ana@gmail.com',
    mensaje: '¿Atienden conejos los domingos?',
  }

  it('devuelve una lista vacía si no hay mensajes guardados', () => {
    expect(listarMensajesContacto()).toEqual([])
  })

  it('guarda el mensaje con id y fecha', () => {
    const guardado = registrarMensajeContacto(mensaje)

    expect(guardado.nombre).toBe('Ana Pérez')
    expect(guardado.correo).toBe('ana@gmail.com')
    expect(guardado.mensaje).toBe('¿Atienden conejos los domingos?')
    expect(guardado.id).toBe(`mc${Date.now()}`)
    expect(guardado.fecha).toBe('2026-11-22T12:00:00.000Z')
  })

  it('el mensaje queda en localStorage y aparece en el listado', () => {
    registrarMensajeContacto(mensaje)

    const lista = listarMensajesContacto()
    expect(lista).toHaveLength(1)
    expect(lista[0].nombre).toBe('Ana Pérez')
    expect(JSON.parse(localStorage.getItem('mensajesContacto'))).toHaveLength(1)
  })

  it('agrega los mensajes nuevos sin borrar los anteriores', () => {
    registrarMensajeContacto(mensaje)
    registrarMensajeContacto({ nombre: 'Luis Soto', correo: 'luis@duocuc.cl', mensaje: 'Hola' })

    const lista = listarMensajesContacto()
    expect(lista).toHaveLength(2)
    expect(lista[1].nombre).toBe('Luis Soto')
  })

  it('devuelve una lista vacía si los datos guardados están dañados', () => {
    localStorage.setItem('mensajesContacto', 'esto no es JSON')

    expect(listarMensajesContacto()).toEqual([])
  })
})