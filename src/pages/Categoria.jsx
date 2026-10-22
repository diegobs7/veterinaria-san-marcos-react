import { useParams } from 'react-router-dom'
import TemplatePagina from '../components/templates/TemplatePagina'
import ListaServicios from '../components/organisms/ListaServicios'
import Enlace from '../components/atoms/Enlace'
import Parrafo from '../components/atoms/Parrafo'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import { resumirCategorias } from '../utils/categorias'

function Categoria() {
    const { slug } = useParams();
    const { servicios } = useServicios();

    const categoria = resumirCategorias(servicios).find((c) => c.slug === slug);

    useTituloPagina(categoria ? categoria.nombre : 'Categoría no encontrada');

    if (!categoria) {
        return (
            <TemplatePagina titulo="Categoría no encontrada">
                <Parrafo clasesExtras="mb-3">No existe una categoría con ese nombre.</Parrafo>
                <Enlace to="/categorias" texto="← Ver todas las categorías" />
            </TemplatePagina>
        );
    }

    const deLaCategoria = servicios.filter((s) => s.categoria === categoria.nombre);

    return (
        <TemplatePagina
            titulo={categoria.nombre}
            descripcion={`${categoria.cantidad} ${categoria.cantidad === 1 ? 'servicio disponible' : 'servicios disponibles'}`}
        >
            <nav className="mb-3" aria-label="Navegación secundaria">
                <Enlace to="/categorias" texto="← Todas las categorías" />
            </nav>
            <ListaServicios servicios={deLaCategoria} />
        </TemplatePagina>
    );
}

export default Categoria;