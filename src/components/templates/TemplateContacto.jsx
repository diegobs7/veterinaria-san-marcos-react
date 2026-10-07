import FormularioContacto from '../organisms/FormularioContacto';

function TemplateContacto(props) {
    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <FormularioContacto
                        nombre={props.nombre}
                        onChangeNombre={props.onChangeNombre}
                        errorNombre={props.errorNombre}

                        correo={props.correo}
                        onChangeCorreo={props.onChangeCorreo}
                        errorCorreo={props.errorCorreo}

                        mensaje={props.mensaje}
                        onChangeMensaje={props.onChangeMensaje}
                        errorMensaje={props.errorMensaje}

                        mensajeExito={props.mensajeExito}
                        claseMensaje={props.claseMensaje}
                        manejarSubmit={props.manejarSubmit}
                    />
                </div>
            </div>

        </div>
    );
}
export default TemplateContacto;