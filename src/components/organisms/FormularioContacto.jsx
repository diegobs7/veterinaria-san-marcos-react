import Subtitulo from '../atoms/Subtitulo';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import CampoTextArea from '../molecules/CampoTextArea';

function FormularioContacto(props) {
    return (
        <>
            <Subtitulo texto="Formulario de contacto" clasesExtras="text-center text-primary mb-4" />
            <form className="p-4 border rounded shadow-sm bg-light" onSubmit={props.manejarSubmit} noValidate>
                <CampoFormulario
                    id="nombre"
                    textoLabel="Nombre completo:"
                    tipo="text"
                    placeholder="Nombre completo"
                    value={props.nombre}
                    onChange={props.onChangeNombre}
                    error={props.errorNombre}
                    mensajeError="Por favor ingresa tu nombre completo."
                />
                <CampoFormulario
                    id="correo"
                    textoLabel="Correo electronico:"
                    tipo = "email"
                    placeholder="ejemplo@gmail.com"
                    value={props.correo}
                    onChange={props.onChangeCorreo}
                    error={props.errorCorreo}
                    mensajeError="Por favor ingresa un correo valido."
                />
                <CampoTextArea
                    id="textarea"
                    textoLabel="Mensaje:"
                    rows="3"
                    placeholder="Escribe tu consulta aquí..."
                    value={props.mensaje}
                    onChange={props.onChangeMensaje}
                    error={props.errorMensaje}
                    mensajeError="El mensaje no puede estar vacío."
                />

                <div className={`mt-3 text-center fw-bold ${props.claseMensaje}`}>
                    {props.mensajeExito}
                </div>
                <div className="d-grid mt-4">
                    <Boton tipoBoton="submit" texto="Enviar consulta" variante="primary" />
                </div>
            </form>
        </>
    );
}

export default FormularioContacto;