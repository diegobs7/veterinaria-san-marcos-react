import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TarjetaServicio from '../molecules/TarjetaServicio'

// Organismo: grilla de tarjetas. 1 columna en celular, 2 en tablet, 3 en escritorio.
function ListaServicios(props) {
    return (
        <Row className="g-3">
            {props.servicios.map((servicio) => (
                <Col key={servicio.id} xs={12} md={6} lg={4}>
                    <TarjetaServicio servicio={servicio} />
                </Col>
            ))}
        </Row>
    );
}

export default ListaServicios;