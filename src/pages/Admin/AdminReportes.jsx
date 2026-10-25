import TemplateAdmin from '../../components/templates/TemplateAdmin';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import DatoResumen from '../../components/molecules/DatoResumen';
import Subtitulo from '../../components/atoms/Subtitulo';
import Parrafo from '../../components/atoms/Parrafo';
import Badge from '../../components/atoms/Badge';
import Enlace from '../../components/atoms/Enlace';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import { obtenerTodasLasCitas } from '../../services/citasService';
import { listarServicios } from '../../services/servicioService';
import { listarUsuarios } from '../../services/usuarioService';
import { obtenerSesion } from '../../utils/sesionAdmin';

function AdminReportes() {
    useTituloPagina('Reportes y Perfil Admin');

    const citas = obtenerTodasLasCitas();
    const servicios = listarServicios();
    const usuarios = listarUsuarios();
    const sesion = obtenerSesion();

    // 1. Reporte de citas por estado
    const porEstado = {
        pendientes: citas.filter((c) => (c.estado || 'Pendiente').toLowerCase() === 'pendiente').length,
        confirmadas: citas.filter((c) => c.estado?.toLowerCase() === 'confirmada').length,
        canceladas: citas.filter((c) => c.estado?.toLowerCase() === 'cancelada').length,
    };

    // 2. Reporte de citas por servicio e identificación de servicios críticos (0 solicitudes o alta duración)
    const conteoPorServicio = servicios.map((srv) => {
        const cantidad = citas.filter((c) => c.servicio === srv.titulo).length;
        return { ...srv, solicitudes: cantidad };
    });

    const masSolicitados = [...conteoPorServicio].sort((a, b) => b.solicitudes - a.solicitudes).slice(0, 5);
    const serviciosCriticos = conteoPorServicio.filter((s) => s.solicitudes === 0 || s.duracion?.includes('60'));

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Reportes del Sistema y Perfil"
                descripcion="Métricas operativas de citas, catálogo de servicios y datos del administrador activo."
            />

            {/* Tarjetas de métricas por Estado */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                        <Parrafo clasesExtras="text-muted small text-uppercase fw-bold">Total Solicitudes</Parrafo>
                        <Subtitulo nivel="h3" texto={String(citas.length)} clasesExtras="h2 fw-bold text-primary m-0" />
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                        <Parrafo clasesExtras="text-muted small text-uppercase fw-bold">Pendientes</Parrafo>
                        <Subtitulo nivel="h3" texto={String(porEstado.pendientes)} clasesExtras="h2 fw-bold text-warning m-0" />
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                        <Parrafo clasesExtras="text-muted small text-uppercase fw-bold">Confirmadas</Parrafo>
                        <Subtitulo nivel="h3" texto={String(porEstado.confirmadas)} clasesExtras="h2 fw-bold text-success m-0" />
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                        <Parrafo clasesExtras="text-muted small text-uppercase fw-bold">Canceladas</Parrafo>
                        <Subtitulo nivel="h3" texto={String(porEstado.canceladas)} clasesExtras="h2 fw-bold text-danger m-0" />
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Citas por Servicio */}
                <div className="col-12 col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100">
                        <Subtitulo nivel="h3" texto="Demanda por Servicio" clasesExtras="h5 fw-bold mb-3" />
                        <div className="table-responsive">
                            <table className="table table-sm align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Servicio</th>
                                        <th>Categoría</th>
                                        <th className="text-end">Citas registradas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {masSolicitados.map((s) => (
                                        <tr key={s.id}>
                                            <td className="fw-medium">{s.titulo}</td>
                                            <td><Badge variante="secondary" texto={s.categoria} /></td>
                                            <td className="text-end fw-bold">{s.solicitudes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Datos del Perfil de quien administra */}
                <div className="col-12 col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100">
                        <Subtitulo nivel="h3" texto="Perfil del Administrador" clasesExtras="h5 fw-bold mb-3" />
                        <DatoResumen etiqueta="Nombre:" valor={sesion?.nombre || 'Administrador'} />
                        <DatoResumen etiqueta="Correo:" valor={sesion?.correo || 'admin@duocuc.cl'} />
                        <DatoResumen etiqueta="Rol activo:" valor={sesion?.rol || 'Administrador'} />
                        <DatoResumen etiqueta="Usuarios en sistema:" valor={String(usuarios.length)} />
                        <div className="mt-3">
                            <Enlace to="/perfil" texto="Editar mi perfil" clasesExtras="btn btn-outline-primary btn-sm" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Ítems críticos / Servicios de atención prolongada o sin rotación */}
            <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                <Subtitulo nivel="h3" texto="Ítems Críticos (Cupos limitados / Sin rotación)" clasesExtras="h5 fw-bold mb-2" />
                <Parrafo clasesExtras="text-muted small mb-3">
                    Servicios de larga duración (60 min) con disponibilidad reducida de box o servicios sin solicitudes recientes.
                </Parrafo>
                <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Servicio</th>
                                <th>Duración</th>
                                <th>Solicitudes</th>
                                <th className="text-end">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviciosCriticos.slice(0, 6).map((s) => (
                                <tr key={s.id}>
                                    <td className="text-secondary fw-semibold">#{s.codigo || s.id}</td>
                                    <td>{s.titulo}</td>
                                    <td>{s.duracion}</td>
                                    <td>
                                        <Badge variante={s.solicitudes === 0 ? 'warning' : 'info'} texto={`${s.solicitudes} citas`} />
                                    </td>
                                    <td className="text-end">
                                        <Enlace to={`/admin/servicios/${s.id}/editar`} texto="Revisar" clasesExtras="btn btn-sm btn-outline-secondary" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </TemplateAdmin>
    );
}

export default AdminReportes;