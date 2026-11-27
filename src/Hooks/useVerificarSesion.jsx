import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { obtenerSesion } from '../utils/sesionAdmin'
import { verificarSesion } from '../services/authService'


export function useVerificarSesion() {
    const location = useLocation()

    useEffect(() => {
        if (!obtenerSesion()) return
        verificarSesion().catch(() => {
        })
    }, [location.pathname])
}