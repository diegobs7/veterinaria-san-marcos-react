import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { iniciarSesion, obtenerSesion, obtenerToken, cerrarSesion } from './sesionAdmin'

const TOKEN = { accessToken: 'jwt-de-prueba', tokenType: 'Bearer', expiresIn: 3600 }
const PERFIL = { id: 7, nombre: 'Ana Pérez', email: 'ana@gmail.com', rol: 'DUENO', aplicacion: 'VETERINARIA', activo: true }

describe('sesionAdmin', () => {
  beforeEach(() => sessionStorage.clear())
  afterEach(() => vi.useRealTimers())

  it('guarda el token y traduce el rol del backend al de la interfaz', () => {
    const sesion = iniciarSesion(TOKEN, PERFIL)
    expect(sesion.rol).toBe('Cliente')
    expect(sesion.rolApi).toBe('DUENO')
    expect(obtenerSesion().correo).toBe('ana@gmail.com')
    expect(obtenerToken()).toBe('jwt-de-prueba')
  })

  it('el administrador del backend es "Administrador" en la interfaz', () => {
    const sesion = iniciarSesion(TOKEN, { ...PERFIL, rol: 'ADMINISTRADOR' })
    expect(sesion.rol).toBe('Administrador')
  })

  it('la sesión persiste mientras el token no venza (simula recargar la página)', () => {
    iniciarSesion(TOKEN, PERFIL)
    expect(obtenerSesion()).not.toBeNull()
    expect(obtenerSesion().id).toBe(7)
  })

  it('una sesión vencida se limpia y devuelve null', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-22T12:00:00'))
    iniciarSesion(TOKEN, PERFIL)
    vi.setSystemTime(new Date('2026-11-22T13:00:01'))
    expect(obtenerSesion()).toBeNull()
    expect(sessionStorage.getItem('sesion')).toBeNull()
  })

  it('cerrarSesion borra todo', () => {
    iniciarSesion(TOKEN, PERFIL)
    cerrarSesion()
    expect(obtenerSesion()).toBeNull()
    expect(obtenerToken()).toBeNull()
  })

  it('sin sesión no hay token', () => {
    expect(obtenerToken()).toBeNull()
  })
})