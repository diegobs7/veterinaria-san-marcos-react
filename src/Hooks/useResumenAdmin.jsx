import { useEffect, useState } from 'react'
import { listarUsuarios } from '../services/usuarioService'
import { useCatalogo } from './useCatalogo'

function leerLista(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? []
  } catch {
    return []
  }
}

export function useResumenAdmin() {
  const { servicios, categorias, cargando, error } = useCatalogo()

  const totalCatalogo = (lista) => {
    if (cargando) return 'Cargando...'
    if (error) return 'No disponible'
    return lista.length
  }
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
      total: totalCatalogo(servicios),
      categorias: totalCatalogo(categorias),
    },
    usuarios: { total: totalUsuarios },
  }
}