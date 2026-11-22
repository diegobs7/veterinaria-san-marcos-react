const APLICACION = 'VETERINARIA'

export function loginRequestDto(formulario) {
  return {
    email: formulario.correo.trim().toLowerCase(),
    password: formulario.contra,
    aplicacion: APLICACION,
  }
}

export function registroRequestDto(formulario) {
  return {
    nombre: formulario.nombreCompleto.trim(),
    email: formulario.correo.trim().toLowerCase(),
    password: formulario.contra,
    aplicacion: APLICACION,
  }
}