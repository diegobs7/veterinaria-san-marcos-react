import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';

function ModalConfirmacion(props) {
    if (!props.abierto) return null;

    const textoConfirmar = props.textoConfirmar || "Sí, cancelar cita";
    const textoCancelar = props.textoCancelar || "Volver";
    const varianteConfirmar = props.varianteConfirmar || "danger";

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg border-0 rounded-4">
                        <div className="modal-header border-0 pb-0">
                            <Subtitulo nivel="h5" texto={props.titulo} clasesExtras={`modal-title fw-bold text-${varianteConfirmar}`} />
                            <button type="button" className="btn-close" onClick={props.onCancelar} aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body py-4">
                            <Parrafo clasesExtras="fs-5 m-0 text-secondary">{props.mensaje}</Parrafo>
                        </div>
                        <div className="modal-footer border-0 bg-light rounded-bottom-4">
                            <Boton 
                                tipoBoton="button" 
                                variante="secondary" 
                                texto={textoCancelar} 
                                onClick={props.onCancelar} 
                            />
                            <Boton 
                                tipoBoton="button" 
                                variante={varianteConfirmar} 
                                texto={textoConfirmar} 
                                onClick={props.onConfirmar} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default ModalConfirmacion;