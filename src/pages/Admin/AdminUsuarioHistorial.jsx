import { useParams } from 'react-router-dom';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import DatoResumen from '../../components/molecules/DatoResumen';
import Badge from '../../components/atoms/Badge';
import Enlace from '../../components/atoms/Enlace';
import Parrafo from '../../components/atoms/Parrafo';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import { buscarUsuarioPorId, nombreCompleto, tipoDeUsuario } from '../../services/usuarioService';
import { obtenerCitasUsuario } from '../../services/citasService';

const VARIANTES_ESTADO = {
    confirmada: 'success',
    cancelada: 'danger',
    pendiente: 'warning',
};

function AdminUsuarioHistorial() {
    const { id } = useParams();
    const usuario = buscarUsuarioPorId(id);

    useTituloPagina(usuario ? `Historial de ${nombreCompleto(usuario)}` : 'Historial de usuario');

    if (!usuario) {
        return (
            <TemplateAdmin>
                <Parrafo clasesExtras="mb-3">Usuario no encontrado.</Parrafo>
                <Enlace to="/admin/usuarios/listado" texto="← Volver a usuarios" />
            </TemplateAdmin>
        );
    }

    const historialCitas = obtenerCitasUsuario(usuario.correo);

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo={`Historial de solicitudes: ${nombreCompleto(usuario)}`}
                descripcion="Registro histórico de todas las citas y atenciones solicitadas por este usuario."
            />

            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 mb-4">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <DatoResumen etiqueta="Correo:" valor={usuario.correo} />
                    </div>
                    <div className="col-12 col-md-4">
                        <DatoResumen etiqueta="RUT:" valor={usuario.rut || 'No registrado'} />
                    </div>
                    <div className="col-12 col-md-4">
                        <DatoResumen etiqueta="Rol:" valor={tipoDeUsuario(usuario)} />
                    </div>
                </div>
            </div>

            {historialCitas.length === 0 ? (
                <div className="alert alert-light border text-center py-4 rounded-4 shadow-sm">
                    <Parrafo clasesExtras="text-muted">Este usuario aún no registra solicitudes ni citas médicas.</Parrafo>
                </div>
            ) : (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="py-3 px-3">ID</th>
                                    <th className="py-3">Mascota</th>
                                    <th className="py-3">Servicio</th>
                                    <th className="py-3">Fecha y Hora</th>
                                    <th className="py-3">Estado</th>
                                    <th className="py-3 px-3 text-end">Comprobante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historialCitas.map((cita) => {
                                    const estado = cita.estado || 'Pendiente';
                                    const variante = VARIANTES_ESTADO[estado.toLowerCase()] || 'warning';
                                    return (
                                        <tr key={cita.id}>
                                            <td className="px-3 fw-semibold text-secondary">#{cita.id}</td>
                                            <td>{cita.mascota || cita.nombreMascota} ({cita.especie})</td>
                                            <td className="fw-medium text-primary">{cita.servicio}</td>
                                            <td>{cita.fecha} - {cita.hora || cita.horario}</td>
                                            <td>
                                                <Badge variante={variante} texto={estado} />
                                            </td>
                                            <td className="px-3 text-end">
                                                <Enlace
                                                    to={`/admin/solicitudes/${cita.id}`}
                                                    texto="Ver ficha"
                                                    clasesExtras="btn btn-sm btn-outline-primary"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Enlace to="/admin/usuarios/listado" texto="← Volver al listado de usuarios" clasesExtras="btn btn-outline-secondary btn-sm" />
        </TemplateAdmin>
    );
}

export default AdminUsuarioHistorial;