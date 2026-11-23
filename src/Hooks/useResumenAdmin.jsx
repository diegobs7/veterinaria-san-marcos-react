import { useEffect, useState } from 'react'
import { useServicios } from '../context/ServiciosContext'
import { listarCategorias } from '../services/categoriaService'
import { listarUsuarios } from '../services/usuarioService'

function leerLista(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? []
  } catch {
    return []
  }
}

export function useResumenAdmin() {
  const { servicios } = useServicios()
  const [totalUsuarios, setTotalUsuarios] = useState('Cargando...')

  useEffect(() => {
    listarUsuarios()
      .then((lista) => setTotalUsuarios(lista.length))
      .catch(() => setTotalUsuarios('No disponible'))
  }, [])
  const solicitudes = leerLista('solicitudes')

  return {
    solicitudes: {
      total: solicitudes.length,
      pendientes: solicitudes.filter((s) => s.estado === 'Pendiente').length,
    },
    catalogo: {
      total: servicios.length,
      categorias: listarCategorias().length,
    },
    usuarios: { total: totalUsuarios },
  }
}