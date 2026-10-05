import Enlace from '../atoms/Enlace'
import Parrafo from '../atoms/Parrafo'

function MensajeRegistro(props) {
    return (
        <Parrafo clasesExtras="text-center mt-3">
            
            {props.textoPregunta}{" "}

            <Enlace href={props.href} texto = {props.textoEnlace}/>
        </Parrafo>
    );
}

export default MensajeRegistro;