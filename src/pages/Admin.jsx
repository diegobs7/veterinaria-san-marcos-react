import Subtitulo from '../components/atoms/Subtitulo'
import Parrafo from '../components/atoms/Parrafo'
import ResumenAdmin from '../components/organisms/ResumenAdmin'
import TemplateAdmin from '../components/templates/TemplateAdmin'
import { useResumenAdmin } from '../Hooks/useResumenAdmin'
import { useTituloPagina } from '../Hooks/useTituloPagina'

function Admin() {
    useTituloPagina('Panel administrador');
    const resumen = useResumenAdmin();

    return (
        <TemplateAdmin>
            <Subtitulo texto="Bienvenido/a al panel administrador" clasesExtras="h4 fw-normal text-center mb-3" />
            <Parrafo clasesExtras="text-muted mb-4">
                Gestiona solicitudes, catálogo y usuarios desde el menú lateral o los accesos de abajo.
            </Parrafo>
            <ResumenAdmin resumen={resumen} />
        </TemplateAdmin>
    );
}

export default Admin;