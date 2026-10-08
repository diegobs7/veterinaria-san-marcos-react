import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import MensajeRegistro from '../molecules/MensajeRegistro';
import Subtitulo from '../atoms/Subtitulo';

function IniciarSesion(props) {
    return (
        <>
            <Subtitulo texto="Inicio de sesion" clasesExtras="text-center text-primary mb-4" />
            <form className="p-4 border rounded shadow-sm bg-light" onSubmit={props.manejarSubmit} noValidate>
                <CampoFormulario
                    id="email"
                    textoLabel="Correo electronico"
                    tipo="email"
                    placeholder="ejemplo@duocuc.cl"
                    value={props.correo}
                    onChange={props.onChangeCorreo}
                    error={props.errorCorreo}
                    mensajeError = "Por favor ingresa un correo válido."
                />
                <CampoFormulario
                    id="password"
                    textoLabel="Contraseña"
                    tipo="password"
                    placeholder="xxxxxxxx"
                    value={props.contra}
                    onChange={props.onChangeContra}
                    error={props.errorContra}
                    mensajeError = "La contraseña debe tener entre 4 a 10 caracteres."
                />

                <div className={`mt-3 text-center fw-bold ${props.claseMensaje}`}>
                    {props.mensajeLogin}
                </div>

                <div className="d-grid mt-4">
                    <Boton tipoBoton="submit" texto="Entrar" variante="primary" />
                </div>
                <MensajeRegistro ruta = "/registro" textoEnlace="Registrate aqui" textoPregunta="¿Aún no tienes una cuenta? " />
            </form>
        </>
    );
}

export default IniciarSesion;