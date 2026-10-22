import { normalizar } from './texto'

export const ICONOS_CATEGORIA = {
  Consultas: '🩺',
  Vacunación: '💉',
  Cirugía: '🏥',
  Desparasitación: '💊',
  Exámenes: '🔬',
  Otros: '🐾',
}

export function obtenerCategorias(servicios) {
  return [...new Set(servicios.map((s) => s.categoria))]
}

export function crearSlug(texto) {
  return normalizar(texto)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function resumirCategorias(servicios) {
  return obtenerCategorias(servicios).map((nombre) => {
    const deLaCategoria = servicios.filter((s) => s.categoria === nombre)
    return {
      nombre,
      slug: crearSlug(nombre),
      cantidad: deLaCategoria.length,
      precioDesde: Math.min(...deLaCategoria.map((s) => s.precio)),
    }
  })
}