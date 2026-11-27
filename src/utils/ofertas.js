import { aplicarDescuento } from './precios'

// Un servicio está en oferta si el backend le asignó un descuento
export function estaEnOferta(servicio) {
  return servicio.descuento != null && servicio.descuento > 0
}

// Precio que paga el cliente: con descuento si está en oferta
export function precioFinal(servicio) {
  return estaEnOferta(servicio)
    ? aplicarDescuento(servicio.precio, servicio.descuento)
    : servicio.precio
}

export function obtenerOfertas(servicios) {
  return servicios.filter(estaEnOferta)
}