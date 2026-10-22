import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TarjetaCategoria from '../molecules/TarjetaCategoria'

function ListaCategorias(props) {
    return (
        <Row className="g-3">
            {props.categorias.map((categoria) => (
                <Col key={categoria.slug} xs={12} md={6} lg={4}>
                    <TarjetaCategoria categoria={categoria} />
                </Col>
            ))}
        </Row>
    );
}

export default ListaCategorias;