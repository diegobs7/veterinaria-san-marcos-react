const CLAVE = 'sesion'

const ROLES_INTERFAZ = {
  ADMINISTRADOR: 'Administrador',
  RECEPCIONISTA: 'Recepcionista',
  DUENO: 'Cliente',
}

export function iniciarSesion(token, perfil) {
  const sesion = {
    token: token.accessToken,
    expiraEn: Date.now() + token.expiresIn * 1000,
    id: perfil.id,
    nombre: perfil.nombre,
    correo: perfil.email,
    rol: ROLES_INTERFAZ[perfil.rol] ?? perfil.rol,
    rolApi: perfil.rol,
    aplicacion: perfil.aplicacion,
  }
  sessionStorage.setItem(CLAVE, JSON.stringify(sesion))
  return sesion
}

function leerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

export function obtenerSesion() {
  const sesion = leerSesion()
  if (!sesion) return null
  if (sesion.expiraEn && Date.now() >= sesion.expiraEn) {
    cerrarSesion()
    return null
  }
  return sesion
}

export function obtenerToken() {
  return leerSesion()?.token ?? null
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE)
}