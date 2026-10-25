import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TarjetaResumenAdmin from '../molecules/TarjetaResumenAdmin'

function ResumenAdmin(props) {
    const { solicitudes, catalogo, usuarios } = props.resumen;

    return (
        <Row className="g-3">
            <Col xs={12} md={6} xl={4}>
                <TarjetaResumenAdmin
                    titulo="Solicitudes"
                    descripcion="Revisa las solicitudes de atención recibidas desde el sitio."
                    datos={[
                        { etiqueta: 'Total:', valor: solicitudes.total },
                        { etiqueta: 'Pendientes:', valor: solicitudes.pendientes },
                    ]}
                    to="/admin/solicitudes"
                    textoEnlace="Ir a Solicitudes"
                />
            </Col>
            <Col xs={12} md={6} xl={4}>
                <TarjetaResumenAdmin
                    titulo="Catálogo"
                    descripcion="Crea, edita y revisa los servicios publicados."
                    datos={[
                        { etiqueta: 'Servicios publicados:', valor: catalogo.total },
                        { etiqueta: 'Categorías:', valor: catalogo.categorias },
                    ]}
                    to="/admin/servicios"
                    textoEnlace="Ir a Servicios"
                />
            </Col>
            <Col xs={12} md={6} xl={4}>
                <TarjetaResumenAdmin
                    titulo="Usuarios"
                    descripcion="Administra las cuentas de los clientes registrados."
                    datos={[{ etiqueta: 'Usuarios registrados:', valor: usuarios.total }]}
                    to="/admin/usuarios"
                    textoEnlace="Ir a Usuarios"
                />
            </Col>
        </Row>
    );
}

export default ResumenAdmin;
