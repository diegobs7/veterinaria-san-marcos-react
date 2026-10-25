import TemplateAdmin from '../../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import AccesosAdmin from '../../components/organisms/AccesosAdmin';
import { useTituloPagina } from '../../Hooks/useTituloPagina';

const ACCESOS = [
    {
        titulo: 'Mostrar servicio',
        descripcion: 'Revisa el listado completo de servicios ya publicados.',
        to: '/admin/servicios/listado',
        textoEnlace: 'Ver listado',
    },
    {
        titulo: 'Nuevo servicio',
        descripcion: 'Agrega un servicio nuevo al catálogo de la tienda.',
        to: '/admin/servicios/nuevo',
        textoEnlace: 'Agregar nuevo',
    },
    {
        titulo: 'Editar servicio',
        descripcion: 'Modifica los datos de un servicio ya existente.',
        to: '/admin/servicios/editar',
        textoEnlace: 'Editar',
    },
];

function AdminServicio() {
    useTituloPagina('Gestión de servicios');

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Gestión de servicios"
                descripcion="Desde aquí puedes revisar el catálogo completo, agregar un servicio nuevo, o editar uno ya existente."
            />
            <AccesosAdmin accesos={ACCESOS} />
        </TemplateAdmin>
    );
}

export default AdminServicio;
