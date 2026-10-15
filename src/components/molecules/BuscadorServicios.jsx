import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '../atoms/Input'
import Selector from '../atoms/Selector'

function BuscadorServicios(props) {
  
    const opciones = props.categorias.map((nombre) => ({ valor: nombre, texto: nombre }));

    return (
        <Row className="g-2 mb-4">
            <Col xs={12} md={7}>
                <Input
                    value={props.texto}
                    onChange={(evento) => props.onTexto(evento.target.value)}
                    placeholder="Buscar un servicio (ej: vacuna, cirugía)"
                    ariaLabel="Buscar servicio por nombre"
                />
            </Col>
            <Col xs={12} md={5}>
                <Selector
                    valor={props.categoria}
                    onCambio={props.onCategoria}
                    opciones={opciones}
                    textoVacio="Todas las categorías"
                    ariaLabel="Filtrar por categoría"
                />
            </Col>
        </Row>
    );
}

export default BuscadorServicios;