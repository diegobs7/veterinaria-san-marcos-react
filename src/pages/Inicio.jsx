import { useTituloPagina } from '../Hooks/useTituloPagina';
import HeroInicio from '../components/organisms/HeroInicio'
import ListaCategorias from '../components/organisms/ListaCategorias'
import ListaServicios from '../components/organisms/ListaServicios'
import SeccionConfianza from '../components/organisms/SeccionConfianza'
import Subtitulo from '../components/atoms/Subtitulo'
import Enlace from '../components/atoms/Enlace'
import EstadoCatalogo from '../components/molecules/EstadoCatalogo'
import { useCatalogo } from '../Hooks/useCatalogo'
import { resumirCategorias } from '../utils/categorias'
import { obtenerOfertas } from '../utils/ofertas'

function Inicio(){
    useTituloPagina('Inicio')
    const { servicios, categorias, cargando, error } = useCatalogo();
    const ofertasDestacadas = obtenerOfertas(servicios).slice(0, 3);

    return(
        <>
            <HeroInicio />

            <section className="container mt-5">
                <Subtitulo texto="Nuestros servicios" clasesExtras="h3 mb-3" />
                <EstadoCatalogo cargando={cargando} error={error} />
                <ListaCategorias categorias={resumirCategorias(servicios, categorias)} />
            </section>

            {ofertasDestacadas.length > 0 && (
                <section className="container mt-5">
                    <div className="d-flex justify-content-between align-items-baseline mb-3">
                        <Subtitulo texto="Ofertas destacadas" clasesExtras="h3 mb-0" />
                        <Enlace to="/ofertas" texto="Ver todas las ofertas →" />
                    </div>
                    <ListaServicios servicios={ofertasDestacadas} />
                </section>
            )}

            <section className="container mt-5">
                <Subtitulo texto="¿Por qué confiar en Clínica San Marcos?" clasesExtras="h3 mb-3" />
                <SeccionConfianza />
            </section>
        </>
    );
}

export default Inicio;