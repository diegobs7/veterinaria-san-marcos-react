import { api } from './api'

export async function login(dto) {
  const respuesta = await api.post('/auth/login', dto)
  return respuesta.data
}

export async function registrar(dto) {
  const respuesta = await api.post('/auth/register', dto)
  return respuesta.data
}

export async function obtenerPerfil(token) {
  const respuesta = await api.get('/auth/me', {
    headers: { Authorization: 'Bearer ' + token },
  })
  return respuesta.data
}
export async function verificarSesion() {
  const respuesta = await api.get('/auth/me')
  return respuesta.data
}