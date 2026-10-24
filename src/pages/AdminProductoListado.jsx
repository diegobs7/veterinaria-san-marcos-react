import TemplateAdmin from '../components/templates/TemplateAdmin';
import Enlace from '../components/atoms/Enlace';
import EncabezadoAdmin from '../components/molecules/EncabezadoAdmin';
import TablaAdmin from '../components/organisms/TablaAdmin';
import { useServicios } from '../context/ServiciosContext';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { formatearPrecio } from '../utils/precios';

function AdminProductoListado() {
    useTituloPagina('Listado de productos');
    const { servicios } = useServicios();

    const filas = servicios.map((servicio) => ({
        id: servicio.id,
        celdas: [servicio.titulo, servicio.categoria, formatearPrecio(servicio.precio)],
        to: `/admin/productos/${servicio.id}/editar`,
    }));

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Listado de productos"
                descripcion="Estos son los productos y servicios publicados actualmente en la tienda."
            />
            <Enlace
                to="/admin/productos/nuevo"
                texto="+ Nuevo producto"
                clasesExtras="btn btn-primary text-white mb-3"
            />
            <TablaAdmin
                titulo="Productos y servicios"
                columnas={['Nombre', 'Categoría', 'Precio']}
                filas={filas}
            />
        </TemplateAdmin>
    );
}

export default AdminProductoListado;
