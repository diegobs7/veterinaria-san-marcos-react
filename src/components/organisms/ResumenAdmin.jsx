import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TarjetaResumenAdmin from '../molecules/TarjetaResumenAdmin'

function ResumenAdmin(props) {
    return (
        <Row className="g-3">
            <Col xs={12} md={6} xl={4}>
                <TarjetaResumenAdmin
                    titulo="Solicitudes"
                    descripcion="Revisa las solicitudes de atención recibidas desde el sitio."
                    datos={[
                        { etiqueta: 'Total:', valor: props.resumen.solicitudes.total },
                        { etiqueta: 'Pendientes:', valor: props.resumen.solicitudes.pendientes },
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
                        { etiqueta: 'Servicios publicados:', valor: props.resumen.catalogo.total },
                        { etiqueta: 'Categorías:', valor: props.resumen.catalogo.categorias },
                    ]}
                    to="/admin/servicios"
                    textoEnlace="Ir a Servicios"
                />
            </Col>
            <Col xs={12} md={6} xl={4}>
                <TarjetaResumenAdmin
                    titulo="Usuarios"
                    descripcion="Administra las cuentas de los clientes registrados."
                    datos={[{ etiqueta: 'Usuarios registrados:', valor: props.resumen.usuarios.total }]}
                    to="/admin/usuarios"
                    textoEnlace="Ir a Usuarios"
                />
            </Col>
        </Row>
    );
}

export default ResumenAdmin;