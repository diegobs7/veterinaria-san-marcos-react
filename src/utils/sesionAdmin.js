const CLAVE = 'sesion'

export function iniciarSesion(correo) {
  const sesion = {
    correo,
    rol: correo.toLowerCase() === 'admin@duocuc.cl' ? 'Administrador' : 'Cliente',
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