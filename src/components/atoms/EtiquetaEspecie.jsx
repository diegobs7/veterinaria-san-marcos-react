import Badge from 'react-bootstrap/Badge'

function EtiquetaEspecie(props) {
    return (
        <Badge bg="light" text="dark" className="border fw-normal">
            {props.especie}
        </Badge>
    )
}

export default EtiquetaEspecie;