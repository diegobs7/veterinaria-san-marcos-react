import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./api', () => ({ api: { post: vi.fn(), get: vi.fn() } }))

import { api } from './api'
import { login, registrar, obtenerPerfil, verificarSesion } from './authService'

describe('authService', () => {
  beforeEach(() => vi.clearAllMocks())

  it('login envía el DTO a POST /auth/login y devuelve el cuerpo', async () => {
    api.post.mockResolvedValue({ data: { accessToken: 'abc', tokenType: 'Bearer', expiresIn: 3600 } })
    const dto = { email: 'a@b.cl', password: '12345678', aplicacion: 'VETERINARIA' }
    const token = await login(dto)
    expect(api.post).toHaveBeenCalledWith('/auth/login', dto)
    expect(token.accessToken).toBe('abc')
  })

  it('registrar envía el DTO a POST /auth/register', async () => {
    api.post.mockResolvedValue({ data: { id: 1, rol: 'DUENO' } })
    const dto = { nombre: 'Ana', email: 'a@b.cl', password: '12345678', aplicacion: 'VETERINARIA' }
    const usuario = await registrar(dto)
    expect(api.post).toHaveBeenCalledWith('/auth/register', dto)
    expect(usuario.rol).toBe('DUENO')
  })

  it('obtenerPerfil pasa el token de forma explícita a GET /auth/me', async () => {
    api.get.mockResolvedValue({ data: { id: 1, email: 'a@b.cl' } })
    await obtenerPerfil('tok123')
    expect(api.get).toHaveBeenCalledWith('/auth/me', { headers: { Authorization: 'Bearer tok123' } })
  })

  it('si la API rechaza, la promesa se rechaza y el error llega a quien llamó', async () => {
    api.post.mockRejectedValue({ response: { status: 401, data: { message: 'Credenciales incorrectas' } } })
    await expect(login({})).rejects.toMatchObject({ response: { status: 401 } })
  })

  it('verificarSesion consulta GET /auth/me con el token que agrega el interceptor', async () => {
    api.get.mockResolvedValue({ data: { id: 1, activo: true } })
    const perfil = await verificarSesion()
    expect(api.get).toHaveBeenCalledWith('/auth/me')
    expect(perfil.activo).toBe(true)
  })
})