import { Link } from 'react-router-dom';

function MensajeRegistro(props) {
    return (
        <div className="mt-3 text-center">
            <span>{props.textoPregunta}</span>
            <Link to={props.ruta} className="btn btn-link text-decoration-none p-0 align-baseline">
                {props.textoEnlace}
            </Link>
        </div>
    );
}

export default MensajeRegistro;