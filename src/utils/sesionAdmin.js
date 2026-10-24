import { buscarUsuarioPorCorreo, tipoDeUsuario } from '../services/usuarioService'

const CLAVE = 'sesion'

export function iniciarSesion(correo) {
  const usuario = buscarUsuarioPorCorreo(correo)
  const sesion = {
    correo,
    rol: usuario ? tipoDeUsuario(usuario) : 'Cliente',
  }
  sessionStorage.setItem(CLAVE, JSON.stringify(sesion))
  return sesion
}

export function obtenerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE)
}