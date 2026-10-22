import TemplatePagina from '../components/templates/TemplatePagina'
import ListaCategorias from '../components/organisms/ListaCategorias'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import { resumirCategorias } from '../utils/categorias'

function Categorias() {
    useTituloPagina('Categorías');
    const { servicios } = useServicios();

    return (
        <TemplatePagina
            titulo="Categorías de servicios"
            descripcion="Elige el tipo de atención que necesita tu mascota."
        >
            <ListaCategorias categorias={resumirCategorias(servicios)} />
        </TemplatePagina>
    );
}

export default Categorias;