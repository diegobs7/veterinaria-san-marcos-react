import Subtitulo from '../atoms/Subtitulo'
import IniciarSesion from '../organisms/IniciarSesion'

function TemplateLogin(props) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <IniciarSesion
                    correo = {props.correo}
                    onChangeCorreo = {props.onChangeCorreo}
                    errorCorreo = {props.errorCorreo}

                    contra = {props.contra}
                    onChangeContra = {props.onChangeContra}
                    errorContra = {props.errorContra}

                    mensajeLogin = {props.mensajeLogin}
                    claseMensaje = {props.claseMensaje}
                    manejarSubmit = {props.manejarSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default TemplateLogin;