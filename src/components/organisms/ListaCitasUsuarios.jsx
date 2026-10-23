import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Enlace from '../atoms/Enlace';
import Boton from '../atoms/Boton';

function ListaCitasUsuario({ citas, onCancelar }) {
    if (!citas || citas.length === 0) {
        return (
            <div className="text-center py-5">
                <Subtitulo texto="No tienes citas agendadas" clasesExtras="text-muted mb-3" />
                <Parrafo clasesExtras="mb-4">Visita nuestros servicios para agendar una hora para tu mascota.</Parrafo>
                <Enlace to="/servicios" texto="Ver Servicios" clasesExtras="btn btn-primary fw-bold text-white px-4 py-2 rounded-pill" />
            </div>
        );
    }

    return (
        <div className="row g-4">
            {citas.map((cita) => (
                <div className="col-12 col-md-6 col-lg-4" key={cita.id}>
                    <div className="card h-100 shadow-sm border-0 rounded-4 bg-white overflow-hidden">
                        
                        <div className="bg-primary bg-opacity-10 p-4 border-bottom border-primary border-opacity-10 d-flex justify-content-between align-items-start">
                            <div>
                                <Parrafo clasesExtras="text-primary fw-bold mb-1 small text-uppercase">
                                    {cita.servicio}
                                </Parrafo>
                                
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <Subtitulo nivel="h4" texto={cita.mascota} clasesExtras="fw-bold text-dark m-0" />
                                    <span className="badge bg-white text-secondary border border-secondary border-opacity-25 rounded-pill px-2 py-1 fw-normal">
                                        {cita.especie}
                                    </span>
                                </div>
                            </div>
                            <span className="badge bg-white text-primary border border-primary rounded-pill px-3 py-2 shadow-sm">
                                Confirmada
                            </span>
                        </div>
                        
                        <div className="card-body p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-4 flex-grow-1">
                                <div className="d-flex flex-column">
                                    <span className="text-muted small text-uppercase fw-bold mb-1">Fecha</span>
                                    <span className="fw-bold text-dark fs-5">{cita.fecha}</span>
                                </div>
                                <div className="d-flex flex-column text-end">
                                    <span className="text-muted small text-uppercase fw-bold mb-1">Hora</span>
                                    <span className="fw-bold text-dark fs-5">{cita.hora}</span>
                                </div>
                            </div>
                            
                            <Boton 
                                tipoBoton="button"
                                variante="outline-danger"
                                clasesExtras="w-100 fw-bold rounded-pill"
                                texto="Cancelar cita"
                                onClick={() => onCancelar(cita.id)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListaCitasUsuario;