import { useTituloPagina } from '../Hooks/useTituloPagina';
import HeroInicio from '../components/organisms/HeroInicio'
import ListaCategorias from '../components/organisms/ListaCategorias'
import ListaServicios from '../components/organisms/ListaServicios'
import SeccionConfianza from '../components/organisms/SeccionConfianza'
import Subtitulo from '../components/atoms/Subtitulo'
import Enlace from '../components/atoms/Enlace'
import { useServicios } from '../context/ServiciosContext'
import { resumirCategorias } from '../utils/categorias'
import { obtenerOfertas } from '../utils/ofertas'
import ofertasIniciales from '../data/ofertas.json'

function Inicio(){
    useTituloPagina('Inicio')
    const { servicios } = useServicios();
    const ofertasDestacadas = obtenerOfertas(servicios, ofertasIniciales).slice(0, 3);

    return(
        <>
            <HeroInicio />

            <section className="container mt-5">
                <Subtitulo texto="Nuestros servicios" clasesExtras="h3 mb-3" />
                <ListaCategorias categorias={resumirCategorias(servicios)} />
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