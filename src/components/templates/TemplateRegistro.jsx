import RegistroUsuario from '../organisms/RegistroUsuario';

function TemplateRegistro(props) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <RegistroUsuario
                        nombre={props.nombre}
                        onChangeNombre={props.onChangeNombre}
                        errorNombre={props.errorNombre}

                        correo={props.correo}
                        onChangeCorreo={props.onChangeCorreo}
                        errorCorreo={props.errorCorreo}

                        contra={props.contra}
                        onChangeContra={props.onChangeContra}
                        errorContra={props.errorContra}

                        repetirContra={props.repetirContra}
                        onChangeRepetirContra={props.onChangeRepetirContra}
                        errorRepetirContra={props.errorRepetirContra}

                        mensajeRegistro={props.mensajeRegistro}
                        claseMensaje={props.claseMensaje}
                        manejarSubmit={props.manejarSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default TemplateRegistro;