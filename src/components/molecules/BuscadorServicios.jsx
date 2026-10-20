import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '../atoms/Input'
import Selector from '../atoms/Selector'

function BuscadorServicios(props) {
  
    const opciones = props.categorias.map((nombre) => ({ valor: nombre, texto: nombre }));

    return (
        <Row className="g-2 mb-4">
            <Col xs={12} md={7}>
                <label className="visually-hidden" htmlFor="buscador-texto">
                    Buscar servicio por nombre
                </label>
                <Input
                    id="buscador-texto"
                    value={props.texto}
                    onChange={(evento) => props.onTexto(evento.target.value)}
                    placeholder="Buscar un servicio (ej: vacuna, cirugía)"
                />
            </Col>
            <Col xs={12} md={5}>
                <label className="visually-hidden" htmlFor="buscador-categoria">
                    Filtrar por categoría
                </label>
                <Selector
                    id="buscador-categoria"
                    value={props.categoria}
                    onChange={(evento) => props.onCategoria(evento.target.value)}
                    opciones={opciones}
                    textoDefecto="Todas las categorías"
                />
            </Col>
        </Row>
    );
}

export default BuscadorServicios;