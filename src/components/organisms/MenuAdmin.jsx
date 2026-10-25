import Boton from '../atoms/Boton'
import ListaEnlaces from '../molecules/ListaEnlaces'

const ENLACES_ADMIN = [
    { to: '/admin', texto: 'Inicio', end: true },
    { to: '/admin/solicitudes', texto: 'Solicitudes' },
    { to: '/admin/servicios', texto: 'Servicios' },
    { to: '/admin/usuarios', texto: 'Usuarios' },
    {to: '/admin/reportes', texto: 'Reportes'},
    {to: '/admin/categorias', texto: 'Categorías'},
    { to: '/', texto: 'Volver a la tienda' },
];

function MenuAdmin(props) {
    return (
        <nav className="admin-menu border-end bg-white p-3" aria-label="Menú de administración">
            <ListaEnlaces enlaces={ENLACES_ADMIN} clasesExtras="flex-column mb-3" />
            <Boton
                tipoBoton="button"
                variante="outline-danger"
                texto="Cerrar sesión"
                clasesExtras="w-100"
                onClick={props.onCerrarSesion}
            />
        </nav>
    );
}

export default MenuAdmin;
