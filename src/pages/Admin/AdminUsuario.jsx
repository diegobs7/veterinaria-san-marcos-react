import TemplateAdmin from '../../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import AccesosAdmin from '../../components/organisms/AccesosAdmin';
import { useTituloPagina } from '../../Hooks/useTituloPagina';

const ACCESOS = [
    {
        titulo: 'Mostrar usuario',
        descripcion: 'Revisa el listado completo de cuentas de clientes registradas.',
        to: '/admin/usuarios/listado',
        textoEnlace: 'Ver listado',
    },
    {
        titulo: 'Nuevo usuario',
        descripcion: 'Crea una cuenta de cliente nueva directamente desde el panel.',
        to: '/admin/usuarios/nuevo',
        textoEnlace: 'Agregar nuevo',
    },
    {
        titulo: 'Editar usuario',
        descripcion: 'Modifica los datos de una cuenta de cliente ya existente.',
        to: '/admin/usuarios/listado',
        textoEnlace: 'Editar',
    },
];

function AdminUsuario() {
    useTituloPagina('Gestión de usuarios');

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Gestión de usuarios"
                descripcion="Desde aquí puedes revisar las cuentas de clientes ya registradas, agregar una cuenta nueva, o editar los datos de una existente."
            />
            <AccesosAdmin accesos={ACCESOS} />
        </TemplateAdmin>
    );
}

export default AdminUsuario;
