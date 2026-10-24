import TemplateAdmin from '../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../components/molecules/EncabezadoAdmin';
import AccesosAdmin from '../components/organisms/AccesosAdmin';
import { useTituloPagina } from '../Hooks/useTituloPagina';

const ACCESOS = [
    {
        titulo: 'Mostrar producto',
        descripcion: 'Revisa el listado completo de productos y servicios ya publicados.',
        to: '/admin/productos/listado',
        textoEnlace: 'Ver listado',
    },
    {
        titulo: 'Nuevo producto',
        descripcion: 'Agrega un producto o servicio nuevo al catálogo de la tienda.',
        to: '/admin/productos/nuevo',
        textoEnlace: 'Agregar nuevo',
    },
    {
        titulo: 'Editar producto',
        descripcion: 'Modifica los datos de un producto o servicio ya existente.',
        to: '/admin/productos/listado',
        textoEnlace: 'Editar',
    },
];

function AdminProducto() {
    useTituloPagina('Gestión de productos');

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Gestión de productos"
                descripcion="Desde aquí puedes revisar el catálogo completo, agregar un producto o servicio nuevo, o editar uno ya existente."
            />
            <AccesosAdmin accesos={ACCESOS} />
        </TemplateAdmin>
    );
}

export default AdminProducto;
