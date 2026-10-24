import TemplateAdmin from '../components/templates/TemplateAdmin';
import Enlace from '../components/atoms/Enlace';
import EncabezadoAdmin from '../components/molecules/EncabezadoAdmin';
import TablaAdmin from '../components/organisms/TablaAdmin';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { listarUsuarios, nombreCompleto, tipoDeUsuario } from '../services/usuarioService';

function AdminUsuarioListado() {
    useTituloPagina('Listado de usuarios');

    const filas = listarUsuarios().map((usuario) => ({
        id: usuario.id,
        celdas: [
            nombreCompleto(usuario),
            usuario.correo,
            tipoDeUsuario(usuario),
            usuario.region || 'No registrada',
        ],
        to: `/admin/usuarios/${usuario.id}/editar`,
    }));

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Listado de usuarios"
                descripcion="Estas son las cuentas registradas actualmente en el sitio."
            />
            <Enlace
                to="/admin/usuarios/nuevo"
                texto="+ Nuevo usuario"
                clasesExtras="btn btn-primary text-white mb-3"
            />
            <TablaAdmin
                titulo="Usuarios registrados"
                columnas={['Nombre', 'Correo', 'Tipo', 'Región']}
                filas={filas}
            />
        </TemplateAdmin>
    );
}

export default AdminUsuarioListado;
