import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import MensajeRegistro from '../molecules/MensajeRegistro';
import Subtitulo from '../atoms/Subtitulo';

function RegistroUsuario(props) {
    return (
        <>
            <Subtitulo texto="Registro de usuario" clasesExtras="text-center text-primary mb-4" />
            <form className="p-4 border rounded shadow-sm bg-light" noValidate onSubmit={props.manejarSubmit}>
                
                <CampoFormulario 
                    id="nombre"
                    textoLabel="Nombre completo"
                    tipo="text"
                    placeholder="Tu nombre"
                    value={props.nombre}
                    onChange={props.onChangeNombre}
                    error={props.errorNombre}
                    mensajeError={props.errorNombre}
                />

                <CampoFormulario 
                    id="email"
                    textoLabel="Correo electrónico"
                    tipo="email"
                    placeholder="ejemplo@gmail.com"
                    value={props.correo}
                    onChange={props.onChangeCorreo}
                    error={props.errorCorreo}
                    mensajeError={props.errorCorreo}
                />

                <CampoFormulario 
                    id="password"
                    textoLabel="Contraseña"
                    tipo="password"
                    placeholder="6 a 10 caracteres"
                    value={props.contra}
                    onChange={props.onChangeContra}
                    error={props.errorContra}
                    mensajeError={props.errorContra}
                />

                <CampoFormulario 
                    id="repetirContra"
                    textoLabel="Confirmar contraseña"
                    tipo="password"
                    placeholder="Repite tu contraseña"
                    value={props.repetirContra}
                    onChange={props.onChangeRepetirContra}
                    error={props.errorRepetirContra}
                    mensajeError={props.errorRepetirContra}
                />

                <div className={`mt-3 text-center fw-bold ${props.claseMensaje}`}>
                    {props.mensajeRegistro}
                </div>

                <div className="d-grid mt-4">
                    <Boton tipoBoton="submit" texto="Registrarse" variante="primary" />
                </div>

                <MensajeRegistro 
                    ruta="/login" 
                    textoEnlace="Iniciar sesión aquí" 
                    textoPregunta="¿Ya tienes una cuenta? "
                />
            </form>
        </>
    );
}

export default RegistroUsuario;