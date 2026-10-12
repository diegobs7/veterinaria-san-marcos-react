import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import MensajeRegistro from '../molecules/MensajeRegistro';
import Subtitulo from '../atoms/Subtitulo';

function RegistroUsuario(props) {
    return (
        <>
            <Subtitulo texto="Registro de usuario" clasesExtras="text-center text-primary mb-4" />
            <form className="p-4 border rounded shadow-sm bg-light" onSubmit={props.manejarSubmit} noValidate>
                
                <CampoFormulario 
                    id="nombre"
                    textoLabel="Nombre completo"
                    tipo="text"
                    placeholder="Tu nombre"
                    value={props.nombre}
                    onChange={props.onChangeNombre}
                    error={props.errorNombre}
                    mensajeError="Ingrese un nombre válido (mínimo 3 caracteres)."
                />

                <CampoFormulario 
                    id="email"
                    textoLabel="Correo electrónico"
                    tipo="email"
                    placeholder="ejemplo@gmail.com"
                    value={props.correo}
                    onChange={props.onChangeCorreo}
                    error={props.errorCorreo}
                    mensajeError="Por favor ingresa un correo válido."
                />

                <CampoFormulario 
                    id="password"
                    textoLabel="Contraseña"
                    tipo="password"
                    placeholder="4 a 10 caracteres"
                    value={props.contra}
                    onChange={props.onChangeContra}
                    error={props.errorContra}
                    mensajeError="La contraseña debe tener entre 4 a 10 caracteres."
                />

                <CampoFormulario 
                    id="repetirContra"
                    textoLabel="Confirmar contraseña"
                    tipo="password"
                    placeholder="Repite tu contraseña"
                    value={props.repetirContra}
                    onChange={props.onChangeRepetirContra}
                    error={props.errorRepetirContra}
                    mensajeError="Las contraseñas no coinciden."
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