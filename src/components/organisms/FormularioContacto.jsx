import Subtitulo from '../atoms/Subtitulo';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoTextarea from '../molecules/CampoTextarea';
import Boton from '../atoms/Boton';

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
                    error={props.ErrorNombre}
                    mensajeError="Por favor ingresa tu nombre completo."
                />
                <CampoFormulario
                    id="correo"
                    textoLabel="Correo electronico:"
                    rows="3"
                    placeholder="Escribe tu consulta aqui..."
                    value={props.mensaje}
                    onChange={props.onChangeMensaje}
                    error={props.ErrorMensaje}
                    mensajeError="El mensaje no puede estar vacio."
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