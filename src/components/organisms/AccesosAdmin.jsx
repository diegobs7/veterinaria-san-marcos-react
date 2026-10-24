import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TarjetaResumenAdmin from '../molecules/TarjetaResumenAdmin';

function AccesosAdmin(props) {
    return (
        <Row className="g-3">
            {props.accesos.map((acceso) => (
                <Col xs={12} md={6} xl={4} key={acceso.titulo}>
                    <TarjetaResumenAdmin
                        titulo={acceso.titulo}
                        descripcion={acceso.descripcion}
                        datos={[]}
                        to={acceso.to}
                        textoEnlace={acceso.textoEnlace}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default AccesosAdmin;
