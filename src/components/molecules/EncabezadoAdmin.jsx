import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';

function EncabezadoAdmin(props) {
    return (
        <>
            <Subtitulo texto={props.titulo} clasesExtras="h4 fw-normal text-center mb-3" />
            {props.descripcion && (
                <Parrafo clasesExtras="text-muted text-center mb-4">{props.descripcion}</Parrafo>
            )}
        </>
    );
}

export default EncabezadoAdmin;
