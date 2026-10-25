import { useNavigate } from 'react-router-dom'
import Imagen from '../atoms/Imagen'
import Subtitulo from '../atoms/Subtitulo'
import MenuAdmin from '../organisms/MenuAdmin'
import { cerrarSesion } from '../../utils/sesionAdmin'
import LogoClinica from '../../assets/01fd6fe38564f122b6e092a7c74ab1ce.png'

function TemplateAdmin(props) {
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column min-vh-100 w-100">
            <header className="admin-header text-center py-3">
                <Imagen src={LogoClinica} alt="Logo de la clínica" clasesExtras="logo-admin d-block mx-auto mb-2" />
                <Subtitulo nivel="h1" texto="Panel administrador" clasesExtras="h3 fw-bold text-white m-0" />
            </header>

            <div className="d-flex flex-column flex-md-row flex-grow-1">
                <MenuAdmin onCerrarSesion={manejarCerrarSesion} />
                <main className="flex-grow-1 p-4 min-w-0 overflow-x-hidden">
                    <div className="admin-contenido">
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TemplateAdmin;