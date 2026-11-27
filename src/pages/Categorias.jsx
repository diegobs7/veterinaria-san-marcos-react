import TemplatePagina from '../components/templates/TemplatePagina'
import ListaCategorias from '../components/organisms/ListaCategorias'
import EstadoCatalogo from '../components/molecules/EstadoCatalogo'
import { useCatalogo } from '../Hooks/useCatalogo'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import { resumirCategorias } from '../utils/categorias'

function Categorias() {
    useTituloPagina('Categorías');
    const { servicios, categorias, cargando, error } = useCatalogo();

    return (
        <TemplatePagina
            titulo="Categorías de servicios"
            descripcion="Elige el tipo de atención que necesita tu mascota."
        >
            <EstadoCatalogo cargando={cargando} error={error} />
            <ListaCategorias categorias={resumirCategorias(servicios, categorias)} />
        </TemplatePagina>
    );
}

export default Categorias;