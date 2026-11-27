import { useCategorias } from './useCategorias'
import { useServicios } from './useServicios'

// Servicios y categorías juntos, con un solo estado de carga y de error
export function useCatalogo() {
    const servicios = useServicios()
    const categorias = useCategorias()

    return {
        servicios: servicios.servicios,
        categorias: categorias.categorias,
        cargando: servicios.cargando || categorias.cargando,
        error: servicios.error || categorias.error,
    }
}