import { useParams } from 'react-router-dom'
import TemplatePagina from '../components/templates/TemplatePagina'
import Enlace from '../components/atoms/Enlace'
import Imagen from '../components/atoms/Imagen'
import Parrafo from '../components/atoms/Parrafo'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import entradas from '../data/blogs.json'
import imagenGato from '../assets/images.jpg'
import imagenPerro from '../assets/perrito-scaled.jpg'

const IMAGENES = {
    'images.jpg': imagenGato,
    'perrito-scaled.jpg': imagenPerro,
};

function DetalleBlog() {
    const { id } = useParams();

    const entrada = entradas.find((e) => e.id === id);

    useTituloPagina(entrada ? entrada.titulo : 'Entrada no encontrada');

    if (!entrada) {
        return (
            <TemplatePagina titulo="Entrada no encontrada">
                <Parrafo clasesExtras="mb-3">No existe una entrada del blog con ese número.</Parrafo>
                <Enlace to="/blogs" texto="← Volver al blog" />
            </TemplatePagina>
        );
    }

    return (
        <TemplatePagina titulo={entrada.titulo} descripcion={entrada.fuente}>
            <nav className="mb-3" aria-label="Navegación secundaria">
                <Enlace to="/blogs" texto="← Volver al blog" />
            </nav>

            <article className="mb-5">
                <span className="badge badge-clinica px-2 py-1 mb-3">{entrada.categoria}</span>

                <Imagen
                    src={IMAGENES[entrada.imagen]}
                    alt={entrada.altImagen}
                    clasesExtras="img-blog-custom rounded-4 mb-4 d-block"
                />

                {entrada.parrafos.map((texto, indice) => (
                    <Parrafo key={indice} clasesExtras="mb-3">
                        {texto}
                    </Parrafo>
                ))}

                <a
                    href={entrada.enlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-clinica mt-2"
                >
                    {entrada.enlace.texto}
                </a>
            </article>
        </TemplatePagina>
    );
}

export default DetalleBlog;