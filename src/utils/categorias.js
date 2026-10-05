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