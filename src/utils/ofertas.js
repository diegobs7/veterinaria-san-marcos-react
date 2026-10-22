
import { aplicarDescuento } from './precios'

export function obtenerOfertas(servicios, ofertas) {
  return ofertas
    .map((oferta) => {
      const servicio = servicios.find((s) => s.id === oferta.servicioId)
      
      if (!servicio) return null
      return {
        ...servicio,
        descuento: oferta.descuento,
        precioOferta: aplicarDescuento(servicio.precio, oferta.descuento),
      }
    })
    .filter((oferta) => oferta !== null)
}