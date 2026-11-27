import { useContext } from 'react'
import { ServiciosContexto } from '../context/serviciosContexto'

export function useServicios() {
    const contexto = useContext(ServiciosContexto)
    if (!contexto) {
        throw new Error('useServicios debe usarse dentro de un ServiciosProvider')
    }
    return contexto
}