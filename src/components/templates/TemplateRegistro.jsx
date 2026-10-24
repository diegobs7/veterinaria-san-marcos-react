import Titulo from '../atoms/Titulo';
import RegistroUsuario from '../organisms/RegistroUsuario';

function TemplateRegistro(props) {
    return (
        <div className="container mt-5">
            <Titulo texto="Registro" />
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <RegistroUsuario
                        valores={props.valores}
                        errores={props.errores}
                        onCambio={props.onCambio}
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
