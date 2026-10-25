export function generarCodigoSolicitud(citas) {
  const usados = citas
    .map((cita) => Number(String(cita.codigo ?? '').replace('SOL-', '')))
    .filter(Number.isFinite) // saca los que no son número

  const siguiente = Math.max(0, ...usados) + 1

  return `SOL-${String(siguiente).padStart(4, '0')}`
}

export function formatearNumeroSolicitud(cita) {
  return cita.codigo ?? cita.id
}

export function validarSolicitudCita(solicitud, { servicios, citas, ahora = new Date() }) {
  if (!solicitud) {
    return 'No hay una solicitud en curso.'
  }

  if (!servicios.some((s) => s.id === solicitud.servicioId)) {
    return 'El servicio elegido ya no está disponible en el catálogo.'
  }

  if (new Date(`${solicitud.fecha}T${solicitud.hora}`) < ahora) {
    return 'La fecha y la hora elegidas ya pasaron. Elige otro horario.'
  }

  const repetida = citas.some(
    (c) =>
      c.mascotaId === solicitud.mascotaId &&
      c.fecha === solicitud.fecha &&
      c.hora === solicitud.hora &&
      c.estado !== 'Cancelada',
  )
  if (repetida) {
    return 'Tu mascota ya tiene una cita ese día a esa hora.'
  }

  return ''
}