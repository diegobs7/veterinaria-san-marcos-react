import Subtitulo from '../atoms/Subtitulo'
import Parrafo from '../atoms/Parrafo'

function TemplatePagina(props) {
    return (
        <div className="container mt-5">
            <header className="mb-4">
                <Subtitulo texto={props.titulo} clasesExtras="h3 mb-1" />
                {props.descripcion && (
                    <Parrafo clasesExtras="text-muted">{props.descripcion}</Parrafo>
                )}
            </header>
            {props.children}
        </div>
    );
}

export default TemplatePagina;