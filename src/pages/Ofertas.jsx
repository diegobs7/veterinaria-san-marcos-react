import TemplatePagina from '../components/templates/TemplatePagina'
import ListaServicios from '../components/organisms/ListaServicios'
import Parrafo from '../components/atoms/Parrafo'
import EstadoCatalogo from '../components/molecules/EstadoCatalogo'
import { useServicios } from '../Hooks/useServicios'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import { obtenerOfertas } from '../utils/ofertas'

function Ofertas() {
    useTituloPagina('Ofertas');
    const { servicios, cargando, error } = useServicios();

    const ofertas = obtenerOfertas(servicios);
    const listo = !cargando && !error;

    return (
        <TemplatePagina
            titulo="Ofertas"
            descripcion="Servicios con precio especial. Los valores se confirman al agendar tu hora."
        >
            <EstadoCatalogo cargando={cargando} error={error} />
            {listo && ofertas.length === 0 && (
                <Parrafo>Por ahora no hay ofertas disponibles.</Parrafo>
            )}
            {ofertas.length > 0 && <ListaServicios servicios={ofertas} />}
        </TemplatePagina>
    );
}

export default Ofertas;