import { Link } from 'react-router-dom';

function MensajeRegistro({ href, textoEnlace, textoPregunta }) {
    return (
        <div className="mt-3 text-center">
            <span className="text-muted">{textoPregunta} </span>
            <Link to={href} className="text-decoration-none fw-bold">
                {textoEnlace}
            </Link>
        </div>
    );
}

export default MensajeRegistro;