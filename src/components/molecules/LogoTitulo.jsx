import Titulo from '../atoms/Titulo'
import Subtitulo from '../atoms/Subtitulo'
import Imagen from '../atoms/Imagen'
import LogoClinica from '../../assets/01fd6fe38564f122b6e092a7c74ab1ce.png'

function LogoTitulo(props) {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center py-1 ${props.clasesExtras || ""}`}>
            <Imagen src={LogoClinica} alt = "Logo principal de la clinica" clasesExtras="logo-veterinaria mb-2"/>
            <Titulo texto = "Clinica Veterinaria San Marcos" clasesExtras="text-center fw-bold m-0"/>
            <Subtitulo texto = "Salud, amor y bienestar para tus mejores amigos." clasesExtras="fw-light text-center m-0"/>
        </div>
    );
}
export default LogoTitulo;