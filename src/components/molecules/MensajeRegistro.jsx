import { Link } from 'react-router-dom';

function MensajeRegistro(props) {
    return (
        <div className="mt-3 text-center">
            <span>{props.textoPregunta}</span>
            <Link to={props.ruta} className='text-decoration-none bold'>
                {props.textoEnlace}
            </Link>
        </div>
    );
}

export default MensajeRegistro;