import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { api } from './api'
import { iniciarSesion, obtenerSesion } from '../utils/sesionAdmin'

const PERFIL = { id: 1, nombre: 'Ana', email: 'ana@gmail.com', rol: 'DUENO', aplicacion: 'VETERINARIA' }

function adaptadorQueResponde(estado, capturar) {
  return async (config) => {
    capturar.config = config
    if (estado >= 400) {
      throw new axios.AxiosError('error', 'ERR_BAD_REQUEST', config, null, { status: estado, data: {}, config })
    }
    return { data: {}, status: estado, statusText: 'OK', headers: {}, config }
  }
}

describe('instancia de Axios (api.js)', () => {
  beforeEach(() => {
    sessionStorage.clear()
    Object.defineProperty(window, 'location', {
      value: { pathname: '/admin', assign: vi.fn() },
      writable: true,
    })
  })

  it('la dirección base viene de VITE_API_URL o usa la local por defecto', () => {
    expect(api.defaults.baseURL).toMatch(/\/api\/v1$/)
    expect(api.defaults.timeout).toBe(10000)
  })

  it('agrega el Bearer a las solicitudes protegidas cuando hay sesión', async () => {
    const visto = {}
    api.defaults.adapter = adaptadorQueResponde(200, visto)
    iniciarSesion({ accessToken: 'tok-123', expiresIn: 3600 }, PERFIL)
    await api.get('/usuarios')
    expect(visto.config.headers.Authorization).toBe('Bearer tok-123')
  })

  it('no adjunta el token al login ni al registro', async () => {
    const visto = {}
    api.defaults.adapter = adaptadorQueResponde(200, visto)
    iniciarSesion({ accessToken: 'tok-viejo', expiresIn: 3600 }, PERFIL)
    await api.post('/auth/login', {})
    expect(visto.config.headers.Authorization).toBeUndefined()
  })

  it('ante un 401 con token cierra la sesión y vuelve al login', async () => {
    const visto = {}
    api.defaults.adapter = adaptadorQueResponde(401, visto)
    iniciarSesion({ accessToken: 'tok-vencido', expiresIn: 3600 }, PERFIL)
    await expect(api.get('/usuarios')).rejects.toBeTruthy()
    expect(obtenerSesion()).toBeNull()
    expect(window.location.assign).toHaveBeenCalledWith('/login')
  })

  it('un 401 sin token (login fallido) no redirige ni toca nada', async () => {
    const visto = {}
    api.defaults.adapter = adaptadorQueResponde(401, visto)
    await expect(api.post('/auth/login', {})).rejects.toBeTruthy()
    expect(window.location.assign).not.toHaveBeenCalled()
  })
})