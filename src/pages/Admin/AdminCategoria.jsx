import TemplateAdmin from '../../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import AccesosAdmin from '../../components/organisms/AccesosAdmin';
import { useTituloPagina } from '../../Hooks/useTituloPagina';

const ACCESOS = [
  {
    titulo: 'Mostrar categorías',
    descripcion: 'Revisa el listado completo de categorías del catálogo.',
    to: '/admin/categorias/listado',
    textoEnlace: 'Ver listado',
  },
  {
    titulo: 'Nueva categoría',
    descripcion: 'Agrega una categoría nueva para clasificar servicios.',
    to: '/admin/categorias/nuevo',
    textoEnlace: 'Agregar nueva',
  },
  {
    titulo: 'Editar categoría',
    descripcion: 'Modifica el nombre, icono o descripción de una categoría.',
    to: '/admin/categorias/listado',
    textoEnlace: 'Editar',
  },
];

function AdminCategorias() {
  useTituloPagina('Gestión de categorías');

  return (
    <TemplateAdmin>
      <EncabezadoAdmin
        titulo="Gestión de categorías"
        descripcion="Desde aquí puedes revisar, crear y editar las categorías que agrupan los servicios del catálogo."
      />
      <AccesosAdmin accesos={ACCESOS} />
    </TemplateAdmin>
  );
}

export default AdminCategorias;