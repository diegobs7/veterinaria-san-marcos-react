import TemplatePagina from '../components/templates/TemplatePagina'
import SeccionNosotros from '../components/organisms/SeccionNosotros'
import { useTituloPagina } from '../Hooks/useTituloPagina'

// Página informativa: quiénes somos.
function Nosotros() {
    useTituloPagina('Nosotros');

    return (
        <TemplatePagina titulo="Sobre nosotros">
            <SeccionNosotros />
        </TemplatePagina>
    );
}

export default Nosotros;