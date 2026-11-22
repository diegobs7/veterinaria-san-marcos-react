import axios from 'axios'
import { obtenerToken, cerrarSesion } from '../utils/sesionAdmin'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
})

const RUTAS_PUBLICAS = ['/auth/login', '/auth/register']

api.interceptors.request.use((config) => {
  const token = obtenerToken()
  if (token && !RUTAS_PUBLICAS.includes(config.url) && !config.headers.Authorization) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const llevabaToken = Boolean(error.config?.headers?.Authorization)
    if (error.response?.status === 401 && llevabaToken) {
      cerrarSesion()
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)