import { useServicios } from '../context/ServiciosContext'
import { obtenerCategorias } from '../utils/categorias'

function leerLista(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? []
  } catch {
    return []
  }
}

export function useResumenAdmin() {
  const { servicios } = useServicios()
  const usuarios = leerLista('usuarios')
  const solicitudes = leerLista('solicitudes')

  return {
    solicitudes: {
      total: solicitudes.length,
      pendientes: solicitudes.filter((s) => s.estado === 'Pendiente').length,
    },
    catalogo: {
      total: servicios.length,
      categorias: obtenerCategorias(servicios).length,
    },
    usuarios: { total: usuarios.length },
  }
}