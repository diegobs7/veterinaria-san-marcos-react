import { createContext, useContext, useState } from 'react'
import * as servicioService from '../services/servicioService'

const ServiciosContext = createContext(null)

export function ServiciosProvider({ children }) {
 
  const [servicios, setServicios] = useState(() => servicioService.listarServicios())

  function crear(datos) {
    const nuevo = servicioService.crearServicio(datos)
    setServicios(servicioService.listarServicios())
    return nuevo
  }

  function actualizar(id, cambios) {
    const actualizado = servicioService.actualizarServicio(id, cambios)
    setServicios(servicioService.listarServicios())
    return actualizado
  }

  function eliminar(id) {
    servicioService.eliminarServicio(id)
    setServicios(servicioService.listarServicios())
  }

  function obtener(id) {
    return servicios.find((s) => s.id === id) ?? null
  }

  function restablecer() {
    servicioService.restablecerServicios()
    setServicios(servicioService.listarServicios())
  }

  return (
    <ServiciosContext.Provider
      value={{ servicios, obtener, crear, actualizar, eliminar, restablecer }}
    >
      {children}
    </ServiciosContext.Provider>
  )
}

export function useServicios() {
  const contexto = useContext(ServiciosContext)
  if (!contexto) {
    throw new Error('useServicios debe usarse dentro de un ServiciosProvider')
  }
  return contexto
}