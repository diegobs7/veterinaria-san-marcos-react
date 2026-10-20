import { normalizar } from './texto'

export function generarCodigo(categoria, servicios) {
  const deLaCategoria = servicios.filter((s) => s.categoria === categoria)

  const prefijo =
    deLaCategoria.length > 0
      ? deLaCategoria[0].codigo.slice(0, 2)
      : normalizar(categoria ?? '')
          .replace(/[^a-z]/g, '')
          .slice(0, 2)
          .toUpperCase()
          .padEnd(2, 'X')

  const usados = servicios
    .filter((s) => s.codigo.startsWith(prefijo))
    .map((s) => Number(s.codigo.slice(2)))
    .filter(Number.isFinite)

  const siguiente = Math.max(0, ...usados) + 1
  return prefijo + String(siguiente).padStart(3, '0')
}