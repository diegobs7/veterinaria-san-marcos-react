import Badge from '../atoms/Badge';
import Subtitulo from '../atoms/Subtitulo';
import DatoResumen from '../molecules/DatoResumen';
import ListaIncluye from '../molecules/ListaIncluye';
import Alerta from '../molecules/Alerta';
import Parrafo from '../atoms/Parrafo';

function InfoServicio(props) {
    return (
        <article className={props.clasesExtras}>
            <Badge texto={props.especie} variante="info" clasesExtras="mb-2" />
            <Subtitulo nivel="h2" texto={props.titulo} clasesExtras="mb-3" />

            <div className="mb-4">
                <DatoResumen etiqueta="Duración:" valor={props.duracion} />
                {props.modalidad && (
                    <DatoResumen etiqueta="Modalidad:" valor={props.modalidad} />
                )}
            </div>

            {props.descripcion && (
                <>
                    <Subtitulo nivel="h3" texto="Descripción del servicio" clasesExtras="h4" />
                    <Parrafo clasesExtras="mb-3">{props.descripcion}</Parrafo>
                </>
            )}

            {props.incluye && (
                <>
                    <Subtitulo nivel="h4" texto="¿Qué incluye el servicio?" clasesExtras="h5" />
                    <ListaIncluye items={props.incluye} />
                </>
            )}

            {props.advertencia && (
                <Alerta titulo="Importante:" texto={props.advertencia} />
            )}
        </article>
    );
}

export default InfoServicio;