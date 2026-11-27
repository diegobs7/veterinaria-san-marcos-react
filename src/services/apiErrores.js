export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    if (datos && typeof datos.message === 'string') {
      return datos.message
    }
    return 'La API respondió con un error (' + error.response.status + ').'
  }
  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado. Intenta nuevamente en un momento.'
  }
  return 'No fue posible contactar la API. Revisa la conexión, su dirección y CORS.'
}

// Error de Axios → Error de JavaScript con el mensaje que mandó el backend
export function crearErrorDeApi(error) {
  return new Error(obtenerMensajeError(error))
}