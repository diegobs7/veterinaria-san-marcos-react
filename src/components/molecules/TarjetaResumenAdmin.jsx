import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Subtitulo from '../atoms/Subtitulo'
import Parrafo from '../atoms/Parrafo'
import DatoResumen from './DatoResumen'

function TarjetaResumenAdmin(props) {
    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Subtitulo nivel="h3" texto={props.titulo} clasesExtras="h5 text-primary" />
                <Parrafo clasesExtras="text-muted small mb-3">{props.descripcion}</Parrafo>

                {props.datos.map((dato) => (
                    <DatoResumen key={dato.etiqueta} etiqueta={dato.etiqueta} valor={dato.valor} />
                ))}

                <Link to={props.to} className="btn btn-primary mt-auto align-self-start">
                    {props.textoEnlace}
                </Link>
            </Card.Body>
        </Card>
    );
}

export default TarjetaResumenAdmin;