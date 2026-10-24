import Imagen from '../atoms/Imagen';
import Parrafo from '../atoms/Parrafo';
import Icono from '../atoms/Icono';

function AvatarPerfil(props) {
    if (!props.foto) {
        if (props.esNavbar) {
            return <Icono simbolo="👤" />;
        }
        return <Parrafo clasesExtras="display-1 text-center">👤</Parrafo>;
    }

    const clasesContenedor = props.esNavbar
        ? "ratio ratio-1x1 d-inline-block align-middle me-2 navbar-clinica__avatar"
        : "ratio ratio-1x1 w-75 mx-auto mb-3";

    return (
        <div className={clasesContenedor}>
            <Imagen
                src={props.foto}
                alt={props.alt}
                clasesExtras="rounded-circle object-fit-cover"
            />
        </div>
    );
}

export default AvatarPerfil;