export function duracionEnMinutos(texto) {
    const coincidencia = /^(\d+)\s*(min|h)$/i.exec((texto ?? '').trim())
    if (!coincidencia) return 0

    const cantidad = Number(coincidencia[1])
    const unidad = coincidencia[2].toLowerCase()
  return unidad === 'h' ? cantidad * 60 : cantidad
}