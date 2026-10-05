import { Link } from 'react-router-dom';

function MensajeRegistro({ href, textoEnlace, textoPregunta }) {
    return (
<<<<<<< HEAD
        <Parrafo clasesExtras="text-center mt-3">
            
            {props.textoPregunta}{" "}

            <Enlace href={props.href} texto = {props.textoEnlace}/>
        </Parrafo>
=======
        <div className="mt-3 text-center">
            <span className="text-muted">{textoPregunta} </span>
            <Link to={href} className="text-decoration-none fw-bold">
                {textoEnlace}
            </Link>
        </div>
>>>>>>> main
    );
}

export default MensajeRegistro;