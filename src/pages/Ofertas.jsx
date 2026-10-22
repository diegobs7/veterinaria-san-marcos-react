import TemplatePagina from '../components/templates/TemplatePagina'
import ListaServicios from '../components/organisms/ListaServicios'
import Parrafo from '../components/atoms/Parrafo'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import { obtenerOfertas } from '../utils/ofertas'
import ofertasIniciales from '../data/ofertas.json'

function Ofertas() {
    useTituloPagina('Ofertas');
    const { servicios } = useServicios();

    const ofertas = obtenerOfertas(servicios, ofertasIniciales);

    return (
        <TemplatePagina
            titulo="Ofertas"
            descripcion="Servicios con precio especial. Los valores se confirman al agendar tu hora."
        >
            {ofertas.length === 0 ? (
                <Parrafo>Por ahora no hay ofertas disponibles.</Parrafo>
            ) : (
                <ListaServicios servicios={ofertas} />
            )}
        </TemplatePagina>
    );
}

export default Ofertas;