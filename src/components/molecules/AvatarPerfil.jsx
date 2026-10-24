import Imagen from '../atoms/Imagen';
import Parrafo from '../atoms/Parrafo';

function AvatarPerfil(props) {
    if (!props.foto) {
        return <Parrafo clasesExtras="display-1 text-center">👤</Parrafo>;
    }

    return (
        <div className="ratio ratio-1x1 w-75 mx-auto mb-3">
            <Imagen
                src={props.foto}
                alt={props.alt}
                clasesExtras="rounded-circle object-fit-cover"
            />
        </div>
    );
}

export default AvatarPerfil;