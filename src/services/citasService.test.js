import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  guardarCita,
  obtenerCitasUsuario,
  obtenerTodasLasCitas,
  obtenerCitaPorId,
  cambiarEstadoCita,
  confirmarCita,
  cancelarCita,
} from './citasService'

describe('citasService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-25T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const baseCita = {
    correo: 'cliente@duocuc.cl',
    nombreCliente: 'Ana Pérez',
    servicio: 'Consulta general',
    mascotaId: 'm1',
    mascota: 'Firulais',
    especie: 'Perro',
    fecha: '2026-11-01',
    hora: '10:00',
  }

  it('guarda una cita y devuelve success con la cita creada', () => {
    const resultado = guardarCita(baseCita)

    expect(resultado.success).toBe(true)
    expect(resultado.cita).toBeDefined()
    expect(resultado.cita.id).toBeTruthy()
    expect(resultado.cita.estado).toBe('Pendiente')
    expect(resultado.cita.correo).toBe('cliente@duocuc.cl')
    expect(resultado.cita.servicio).toBe('Consulta general')
  })

  it('lista las citas de un usuario por correo', () => {
    guardarCita(baseCita)
    guardarCita({ ...baseCita, correo: 'otro@duocuc.cl', mascota: 'Michi' })

    const delCliente = obtenerCitasUsuario('cliente@duocuc.cl')
    expect(delCliente).toHaveLength(1)
    expect(delCliente[0].mascota).toBe('Firulais')
  })

  it('obtiene todas las citas (admin)', () => {
    guardarCita(baseCita)
    guardarCita({ ...baseCita, correo: 'otro@duocuc.cl' })

    expect(obtenerTodasLasCitas()).toHaveLength(2)
  })

  it('obtiene una cita por id', () => {
    const { cita } = guardarCita(baseCita)
    expect(obtenerCitaPorId(cita.id)).toEqual(cita)
    expect(obtenerCitaPorId('no-existe')).toBeNull()
  })

  it('confirma y cancela una cita', () => {
    const { cita } = guardarCita(baseCita)

    confirmarCita(cita.id)
    expect(obtenerCitaPorId(cita.id).estado).toBe('Confirmada')

    cancelarCita(cita.id)
    expect(obtenerCitaPorId(cita.id).estado).toBe('Cancelada')
  })

  it('cambiarEstadoCita actualiza el estado', () => {
    const { cita } = guardarCita(baseCita)
    cambiarEstadoCita(cita.id, 'En curso')
    expect(obtenerCitaPorId(cita.id).estado).toBe('En curso')
  })
})