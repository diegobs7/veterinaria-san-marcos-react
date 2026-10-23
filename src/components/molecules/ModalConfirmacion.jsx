import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';

function ModalConfirmacion({ 
    abierto, 
    titulo, 
    mensaje, 
    onConfirmar, 
    onCancelar,
    textoConfirmar = "Sí, cancelar cita",
    textoCancelar = "Volver",
    varianteConfirmar = "danger" 
}) {
    if (!abierto) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg border-0 rounded-4">
                        <div className="modal-header border-0 pb-0">
                            <Subtitulo nivel="h5" texto={titulo} clasesExtras={`modal-title fw-bold text-${varianteConfirmar}`} />
                            <button type="button" className="btn-close" onClick={onCancelar} aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body py-4">
                            <Parrafo clasesExtras="fs-5 m-0 text-secondary">{mensaje}</Parrafo>
                        </div>
                        <div className="modal-footer border-0 bg-light rounded-bottom-4">
                            <Boton 
                                tipoBoton="button" 
                                variante="secondary" 
                                texto={textoCancelar} 
                                onClick={onCancelar} 
                            />
                            <Boton 
                                tipoBoton="button" 
                                variante={varianteConfirmar} 
                                texto={textoConfirmar} 
                                onClick={onConfirmar} 
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