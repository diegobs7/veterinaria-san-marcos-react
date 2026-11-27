import { useEffect, useState } from 'react'
import { ServiciosContexto } from './serviciosContexto'
import * as servicioService from '../services/servicioService'

// Carga los servicios desde el backend y los comparte con toda la app
export function ServiciosProvider(props) {
    const [servicios, setServicios] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    async function recargar() {
        try {
            setServicios(await servicioService.listarServicios())
            setError('')
        } catch (e) {
            setError(e.message)
        } finally {
            setCargando(false)
        }
    }

    // Carga inicial. Los setState van dentro de .then/.catch, cuando responde el backend
    useEffect(() => {
        servicioService.listarServicios()
            .then((lista) => setServicios(lista))
            .catch((e) => setError(e.message))
            .finally(() => setCargando(false))
    }, [])

    function obtener(id) {
        return servicios.find((s) => s.id === String(id)) ?? null
    }

    async function crear(datos) {
        const nuevo = await servicioService.crearServicio(datos)
        await recargar()
        return nuevo
    }

    // El formulario no edita incluye, observaciones ni descuento: se juntan los
    // cambios con el servicio actual para que el PUT no los borre
    async function actualizar(id, cambios) {
        const completo = { ...obtener(id), ...cambios }
        const actualizado = await servicioService.actualizarServicio(id, completo)
        await recargar()
        return actualizado
    }

    async function eliminar(id) {
        await servicioService.eliminarServicio(id)
        await recargar()
    }

    return (
        <ServiciosContexto.Provider
            value={{ servicios, cargando, error, obtener, crear, actualizar, eliminar, recargar }}
        >
            {props.children}
        </ServiciosContexto.Provider>
    )
}