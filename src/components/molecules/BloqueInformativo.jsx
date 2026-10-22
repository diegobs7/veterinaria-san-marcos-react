import Subtitulo from '../atoms/Subtitulo'
import Parrafo from '../atoms/Parrafo'

function BloqueInformativo(props) {
    return (
        <div className="mb-4">
            <Subtitulo texto={props.titulo} nivel="h3" clasesExtras="h5 titulo-clinica" />
            <Parrafo clasesExtras="text-secondary">{props.texto}</Parrafo>
        </div>
    );
}

export default BloqueInformativo;