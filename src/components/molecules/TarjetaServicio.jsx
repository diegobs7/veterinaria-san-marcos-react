import Card from 'react-bootstrap/Card'
import Icono from '../atoms/Icono'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import { ICONOS_CATEGORIA } from '../../utils/categorias'
import { formatearPrecio } from '../../utils/precios'

// Molécula: presenta UN servicio del catálogo.
function TarjetaServicio(props) {
    const servicio = props.servicio;

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="fs-4">
                        <Icono simbolo={ICONOS_CATEGORIA[servicio.categoria] ?? '🐾'} />
                    </span>
                    <EtiquetaEspecie especie={servicio.especie} />
                </div>

                <Card.Title as="h4" className="h6">
                    {servicio.nombre}
                </Card.Title>

                {/* Solo se dibuja si el servicio trae observaciones */}
                {servicio.observaciones && (
                    <Card.Text className="text-muted small mb-2">{servicio.observaciones}</Card.Text>
                )}

                <div className="mt-auto d-flex justify-content-between align-items-end pt-2">
                    <span className="text-muted small">{servicio.duracion}</span>
                    <span className="fw-bold text-primary">{formatearPrecio(servicio.precio)}</span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TarjetaServicio;