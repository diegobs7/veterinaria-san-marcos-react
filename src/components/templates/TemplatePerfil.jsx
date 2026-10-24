import Titulo from '../atoms/Titulo';
import FormularioPerfil from '../organisms/FormularioPerfil';

function TemplatePerfil(props) {
    return (
        <div className="container mt-5 mb-5">
            <Titulo texto="Mi perfil" />
            <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                    <FormularioPerfil
                        usuario={props.usuario}
                        valores={props.valores}
                        errores={props.errores}
                        onCambio={props.onCambio}
                        onCambioFoto={props.onCambioFoto}
                        mensajePerfil={props.mensajePerfil}
                        manejarSubmit={props.manejarSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default TemplatePerfil;