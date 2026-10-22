import Imagen from '../atoms/Imagen';
import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';
import { useNavigate } from 'react-router-dom';

function ArticuloBlog(props) {
    const navigate = useNavigate();
    return (
        <article className="card h-100 border-0 shadow tarjeta-animada">
            <Imagen
                src={props.imagen}
                alt={props.altImagen}
                clasesExtras="card-img-top img-blog-custom"
            />

            <div className="card-body d-flex flex-column p-4">

                <div className="mb-3">
                    <span className="badge badge-clinica px-2 py-1">
                        {props.categoria}
                    </span>
                </div>

                <Subtitulo
                    texto={props.titulo}
                    clasesExtras="card-title fw-bold h5 titulo-clinica mb-3"
                />

                <Parrafo
                    clasesExtras="card-subtitle text-muted small mb-3"
                >
                    {props.fuente}
                </Parrafo>

                <Parrafo
                    clasesExtras="card-text text-secondary mb-4"
                >
                    {props.resumen}
                </Parrafo>

                <div className="mt-auto align-self-start">
                    <Boton
                        texto="Leer más"
                        variante="clinica"
                        onClick={() => navigate(props.ruta)} 
                    />
                </div>
            </div>
        </article>
    );
}
export default ArticuloBlog;