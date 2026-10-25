import { normalizar } from './texto'

export const ICONOS_CATEGORIA = {
  Consultas: '🩺',
  Vacunación: '💉',
  Cirugía: '🏥',
  Desparasitación: '💊',
  Exámenes: '🔬',
  Otros: '🐾',
}

//lee iconos guardados en el CRUD sin importar el service
function iconosDesdeStorage() {
  try {
    const raw = localStorage.getItem('categorias')
    if (!raw) return {}
    const lista = JSON.parse(raw)
    if (!Array.isArray(lista)) return {}
    return Object.fromEntries(
      lista
        .filter((c) => c && c.nombre)
        .map((c) => [c.nombre, c.icono || '🐾'])
    )
  } catch {
    return {}
  }
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
  const iconosAdmin = iconosDesdeStorage()

  return obtenerCategorias(servicios).map((nombre) => {
    const deLaCategoria = servicios.filter((s) => s.categoria === nombre)
    return {
      nombre,
      slug: crearSlug(nombre),
      cantidad: deLaCategoria.length,
      precioDesde: Math.min(...deLaCategoria.map((s) => s.precio)),
      icono: iconosAdmin[nombre] || ICONOS_CATEGORIA[nombre] || '🐾',
    }
  })
}