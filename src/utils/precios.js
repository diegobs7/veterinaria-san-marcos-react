export const RECARGO_URGENCIA_FUERA_DE_HORARIO = 10000

export function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor)
}

export function calcularPrecioFinal(servicio, { fueraDeHorario = false } = {}) {
  const esConsultaUrgencia = servicio.codigo === 'SV002'
  if (esConsultaUrgencia && fueraDeHorario) {
    return servicio.precio + RECARGO_URGENCIA_FUERA_DE_HORARIO
  }
  return servicio.precio
}

export function aplicarDescuento(precio, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('El descuento debe estar entre 0 y 100')
  }
  return Math.round(precio * (1 - porcentaje / 100))
}