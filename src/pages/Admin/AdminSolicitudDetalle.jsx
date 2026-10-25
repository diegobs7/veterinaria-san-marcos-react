import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import DatoResumen from '../../components/molecules/DatoResumen';
import Badge from '../../components/atoms/Badge';
import Boton from '../../components/atoms/Boton';
import Enlace from '../../components/atoms/Enlace';
import Parrafo from '../../components/atoms/Parrafo';
import Subtitulo from '../../components/atoms/Subtitulo';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import { obtenerCitaPorId, cambiarEstadoCita } from '../../services/citasService';

const VARIANTES_ESTADO = {
    confirmada: 'success',
    cancelada: 'danger',
    pendiente: 'warning',
};

function AdminSolicitudDetalle() {
    const { id } = useParams();
    useTituloPagina(`Comprobante #${id}`);

    const [cita, setCita] = useState(() => obtenerCitaPorId(id));

    if (!cita) {
        return (
            <TemplateAdmin>
                <Parrafo clasesExtras="mb-3">Solicitud no encontrada.</Parrafo>
                <Enlace to="/admin/solicitudes" texto="← Volver a solicitudes" />
            </TemplateAdmin>
        );
    }

    const estadoActual = cita.estado || 'Pendiente';
    const variante = VARIANTES_ESTADO[estadoActual.toLowerCase()] || 'warning';

    const manejarCambioEstado = (nuevoEstado) => {
        cambiarEstadoCita(cita.id, nuevoEstado);
        setCita(obtenerCitaPorId(id));
    };

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo={`Ficha de Solicitud #${cita.codigo || cita.id}`}
                descripcion="Comprobante detallado de la reserva médica registrada en el sistema."
            />

            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <div>
                        <Subtitulo nivel="h3" texto="Comprobante de Atención Veterinaria" clasesExtras="h5 fw-bold mb-1" />
                        <Parrafo clasesExtras="text-muted small">
                            Fecha de registro: {cita.creadaEn ? new Date(cita.creadaEn).toLocaleString('es-CL') : cita.fecha}
                        </Parrafo>
                    </div>
                    <Badge variante={variante} texto={estadoActual} clasesExtras="fs-6 px-3 py-2" />
                </div>

                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <Subtitulo nivel="h4" texto="Datos del Cliente" clasesExtras="h6 text-primary fw-bold mb-3" />
                        <DatoResumen etiqueta="Nombre / Cliente:" valor={cita.cliente || cita.nombreCliente || 'Cliente registrado'} />
                        <DatoResumen etiqueta="Correo electrónico:" valor={cita.correo || 'No especificado'} />
                    </div>

                    <div className="col-12 col-md-6">
                        <Subtitulo nivel="h4" texto="Datos del Paciente y Cita" clasesExtras="h6 text-primary fw-bold mb-3" />
                        <DatoResumen etiqueta="Mascota:" valor={cita.mascota || cita.nombreMascota || 'No indicada'} />
                        <DatoResumen etiqueta="Especie:" valor={cita.especie || 'No indicada'} />
                        <DatoResumen etiqueta="Servicio solicitado:" valor={cita.servicio || 'Atención médica'} />
                        <DatoResumen etiqueta="Fecha agendada:" valor={cita.fecha || 'Sin fecha'} />
                        <DatoResumen etiqueta="Bloque horario:" valor={cita.hora || cita.horario || 'Sin hora'} />
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-between align-items-center border-top pt-3 mt-4 gap-2">
                    <Enlace to="/admin/solicitudes" texto="← Volver al listado" clasesExtras="btn btn-outline-secondary btn-sm" />
                    <div className="d-flex gap-2">
                        {estadoActual.toLowerCase() === 'pendiente' && (
                            <Boton
                                tipoBoton="button"
                                variante="success"
                                texto="Confirmar solicitud"
                                onClick={() => manejarCambioEstado('Confirmada')}
                                clasesExtras="btn-sm text-white"
                            />
                        )}
                        {estadoActual.toLowerCase() !== 'cancelada' && (
                            <Boton
                                tipoBoton="button"
                                variante="outline-danger"
                                texto="Cancelar solicitud"
                                onClick={() => manejarCambioEstado('Cancelada')}
                                clasesExtras="btn-sm"
                            />
                        )}
                    </div>
                </div>
            </div>
        </TemplateAdmin>
    );
}

export default AdminSolicitudDetalle;