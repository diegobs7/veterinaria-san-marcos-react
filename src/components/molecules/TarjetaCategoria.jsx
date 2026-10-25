import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Icono from '../atoms/Icono'
import { ICONOS_CATEGORIA } from '../../utils/categorias'
import { formatearPrecio } from '../../utils/precios'

function TarjetaCategoria(props) {
    const categoria = props.categoria;

    return (
        <Card className="h-100 tarjeta-animada">
            <Card.Body className="d-flex flex-column text-center">
                <span className="fs-1">
                    <Icono simbolo={categoria.icono || ICONOS_CATEGORIA[categoria.nombre] || '🐾'} />
                </span>
                <Card.Title as="h3" className="h5 titulo-clinica">
                    {categoria.nombre}
                </Card.Title>
                <Card.Text className="text-muted small">
                    {categoria.cantidad} {categoria.cantidad === 1 ? 'servicio' : 'servicios'} · desde{' '}
                    {formatearPrecio(categoria.precioDesde)}
                </Card.Text>
                <Link
                    to={`/categorias/${categoria.slug}`}
                    className="btn btn-clinica btn-sm mt-auto"
                    aria-label={`Ver servicios de ${categoria.nombre}`}
                >
                    Ver servicios
                </Link>
            </Card.Body>
        </Card>
    );
}

export default TarjetaCategoria;