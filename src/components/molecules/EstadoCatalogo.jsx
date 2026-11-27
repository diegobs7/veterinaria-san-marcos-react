import Parrafo from '../atoms/Parrafo'
import Alerta from './Alerta'

// Muestra "Cargando…" o el error del backend; si el catálogo ya está listo no muestra nada
function EstadoCatalogo(props) {
    if (props.cargando) {
        return <Parrafo clasesExtras="text-muted mb-3">Cargando catálogo…</Parrafo>
    }
    if (props.error) {
        return (
            <Alerta
                variante="danger"
                titulo="No se pudo cargar el catálogo."
                texto={props.error}
                clasesExtras="mb-3"
            />
        )
    }
    return null
}

export default EstadoCatalogo