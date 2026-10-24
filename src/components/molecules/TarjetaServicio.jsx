import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Icono from '../atoms/Icono'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import { ICONOS_CATEGORIA } from '../../utils/categorias'
import { formatearPrecio } from '../../utils/precios'

function TarjetaServicio(props) {
    const servicio = props.servicio;
    const enOferta = servicio.descuento !== undefined;

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="fs-4">
                        <Icono simbolo={ICONOS_CATEGORIA[servicio.categoria] ?? '🐾'} />
                    </span>
                    <div className="d-flex gap-1">
                        {enOferta && <span className="badge text-bg-danger">-{servicio.descuento}%</span>}
                        <EtiquetaEspecie especie={servicio.especie} />
                    </div>
                </div>

                <Card.Title as="h4" className="h6">
                    {servicio.titulo}
                </Card.Title>

                {servicio.observaciones && (
                    <Card.Text className="text-muted small mb-2">{servicio.observaciones}</Card.Text>
                )}

                <div className="mt-auto d-flex justify-content-between align-items-end pt-2">
                    <span className="text-muted small">{servicio.duracion}</span>
                    {enOferta ? (
                        <span className="text-end">
                            <s className="text-muted small d-block">
                                <span className="visually-hidden">Precio normal </span>
                                {formatearPrecio(servicio.precio)}
                            </s>
                            <span className="fw-bold text-primary">
                                <span className="visually-hidden">Precio en oferta </span>
                                {formatearPrecio(servicio.precioOferta)}
                            </span>
                        </span>
                    ) : (
                        <span className="fw-bold text-primary">{formatearPrecio(servicio.precio)}</span>
                    )}
                </div>

                <Link
                    to={`/servicios/${servicio.id}`}
                    className="btn btn-outline-primary btn-sm mt-3"
                    aria-label={`Ver detalle de ${servicio.titulo}`}
                >
                    Ver detalle
                </Link>
            </Card.Body>
        </Card>
    );
}

export default TarjetaServicio;