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

export function resumirCategorias(servicios, categorias) {
  return categorias
    .map((c) => {
      const deLaCategoria = servicios.filter((s) => s.categoriaId === c.id)
      return {
        id: c.id,
        nombre: c.nombre,
        slug: c.slug,
        icono: c.icono,
        cantidad: deLaCategoria.length,
        precioDesde: Math.min(...deLaCategoria.map((s) => s.precio)),
      }
    })
    .filter((c) => c.cantidad > 0)
}

// { idCategoria: cantidad de servicios } para el listado del admin
export function contarServiciosPorCategoria(servicios) {
  const conteo = {}
  servicios.forEach((s) => {
    conteo[s.categoriaId] = (conteo[s.categoriaId] || 0) + 1
  })
  return conteo
}