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