import { useState } from 'react';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Enlace from '../../components/atoms/Enlace';
import Boton from '../../components/atoms/Boton';
import Parrafo from '../../components/atoms/Parrafo';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import ModalConfirmacion from '../../components/molecules/ModalConfirmacion';
import Alerta from '../../components/molecules/Alerta';
import EstadoCatalogo from '../../components/molecules/EstadoCatalogo';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import { useServicios } from '../../Hooks/useServicios';
import { formatearPrecio } from '../../utils/precios';

function AdminServicioListado() {
    useTituloPagina('Listado de servicios');
    const { servicios, cargando, error, eliminar } = useServicios();

    const [errorEliminar, setErrorEliminar] = useState('');
    const [modalEliminar, setModalEliminar] = useState({ abierto: false, servicio: null });

    const abrirModalEliminar = (servicio) => {
        setErrorEliminar('');
        setModalEliminar({ abierto: true, servicio });
    };

    const cerrarModal = () => {
        setModalEliminar({ abierto: false, servicio: null });
    };

    const confirmarEliminar = async () => {
        if (!modalEliminar.servicio) return;

        try {
            await eliminar(modalEliminar.servicio.id);
        } catch (err) {
            setErrorEliminar(err.message || 'No se pudo eliminar el servicio.');
        } finally {
            cerrarModal();
        }
    };

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo="Listado de servicios"
                descripcion="Estos son los servicios veterinarios publicados actualmente en el catálogo."
            />

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Enlace
                    to="/admin/servicios/nuevo"
                    texto="+ Nuevo servicio"
                    clasesExtras="btn btn-primary text-white"
                />
                <span className="text-muted small">Total: {servicios.length} servicios</span>
            </div>

            <EstadoCatalogo cargando={cargando} error={error} />

            {errorEliminar && (
                <Alerta variante="warning" titulo="No se eliminó." texto={errorEliminar} clasesExtras="mb-3" />
            )}

            {!cargando && !error && servicios.length === 0 && (
                <div className="alert alert-light border text-center py-5 rounded-4 shadow-sm">
                    <Parrafo clasesExtras="text-muted">No hay servicios registrados en el catálogo.</Parrafo>
                </div>
            )}

            {servicios.length > 0 && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="py-3 px-3">Código</th>
                                    <th className="py-3">Nombre del servicio</th>
                                    <th className="py-3">Categoría</th>
                                    <th className="py-3">Precio</th>
                                    <th className="py-3 px-3 text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicios.map((s) => (
                                    <tr key={s.id}>
                                        <td className="px-3 fw-semibold text-secondary">#{s.codigo}</td>
                                        <td className="fw-medium text-dark">{s.titulo}</td>
                                        <td>
                                            <span className="badge bg-light text-secondary border px-2 py-1">
                                                {s.categoria}
                                            </span>
                                        </td>
                                        <td className="fw-bold text-primary">{formatearPrecio(s.precio)}</td>
                                        <td className="px-3 text-end">
                                            <div className="d-flex justify-content-end gap-1">
                                                <Enlace
                                                    to={`/admin/servicios/${s.id}/editar`}
                                                    texto="Editar"
                                                    clasesExtras="btn btn-sm btn-outline-primary"
                                                />
                                                <Boton
                                                    tipoBoton="button"
                                                    variante="outline-danger"
                                                    texto="Eliminar"
                                                    onClick={() => abrirModalEliminar(s)}
                                                    clasesExtras="btn-sm"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <ModalConfirmacion
                abierto={modalEliminar.abierto}
                titulo="Eliminar servicio"
                mensaje={`¿Estás seguro de que deseas eliminar permanentemente el servicio "${modalEliminar.servicio?.titulo}"?`}
                onConfirmar={confirmarEliminar}
                onCancelar={cerrarModal}
                textoConfirmar="Sí, eliminar"
                textoCancelar="Cancelar"
                varianteConfirmar="danger"
            />
        </TemplateAdmin>
    );
}

export default AdminServicioListado;