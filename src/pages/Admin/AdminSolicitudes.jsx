import { useState, useEffect } from 'react';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Subtitulo from '../../components/atoms/Subtitulo';
import Parrafo from '../../components/atoms/Parrafo';
import Boton from '../../components/atoms/Boton';
import Badge from '../../components/atoms/Badge';
import ModalConfirmacion from '../../components/molecules/ModalConfirmacion';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import  Enlace  from '../../components/atoms/Enlace';

// Diccionario fuera del componente para no recrearlo en cada render
const VARIANTES_ESTADO = {
  confirmada: 'success',
  cancelada: 'danger',
  pendiente: 'warning',
};

function AdminSolicitudes() {
  useTituloPagina('Gestión de Solicitudes');

  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState('todas');

  // estado unificado para el modal de confirmación (cancelar o eliminar)
  const [modal, setModal] = useState({
    abierto: false,
    id: null,
    tipo: null, // cancelar o eliminar
    titulo: '',
    mensaje: '',
    textoBoton: '',
  });

  const cargarCitas = () => {
    try {
      const data = JSON.parse(localStorage.getItem('solicitudes')) || [];
      setSolicitudes(data);
    } catch {
      setSolicitudes([]);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  
  const actualizarEstado = (idCita, nuevoEstado) => {
    try {
      const actuales = JSON.parse(localStorage.getItem('solicitudes')) || [];
      const actualizadas = actuales.map((c) =>
        c.id === idCita ? { ...c, estado: nuevoEstado } : c
      );
      localStorage.setItem('solicitudes', JSON.stringify(actualizadas));
      setSolicitudes(actualizadas);
    } catch (e) {
      console.error(e);
    }
  };

  // elimina la solicitud de forma permanente
  const eliminarSolicitud = (idCita) => {
    try {
      const actuales = JSON.parse(localStorage.getItem('solicitudes')) || [];
      const actualizadas = actuales.filter((c) => c.id !== idCita);
      localStorage.setItem('solicitudes', JSON.stringify(actualizadas));
      setSolicitudes(actualizadas);
    } catch (e) {
      console.error(e);
    }
  };

  const manejarConfirmar = (id) => {
    actualizarEstado(id, 'Confirmada');
  };

  const abrirModalCancelar = (id) => {
    setModal({
      abierto: true,
      id,
      tipo: 'cancelar',
      titulo: 'Cancelar Cita Médica',
      mensaje: '¿Estás seguro de que deseas cancelar esta solicitud? El cliente verá el estado como "Cancelada".',
      textoBoton: 'Sí, cancelar cita',
    });
  };

  const abrirModalEliminar = (id) => {
    setModal({
      abierto: true,
      id,
      tipo: 'eliminar',
      titulo: 'Eliminar Registro Definitivamente',
      mensaje: 'Esta acción borrará la solicitud por completo del sistema y no se podrá recuperar. ¿Deseas continuar?',
      textoBoton: 'Sí, eliminar',
    });
  };

  const cerrarModal = () => {
    setModal({ abierto: false, id: null, tipo: null, titulo: '', mensaje: '', textoBoton: '' });
  };

  const ejecutarAccionModal = () => {
    if (modal.tipo === 'cancelar') {
      actualizarEstado(modal.id, 'Cancelada');
    } else if (modal.tipo === 'eliminar') {
      eliminarSolicitud(modal.id);
    }
    cerrarModal();
  };

  // Filtrado
  const solicitudesFiltradas = solicitudes.filter((cita) => {
    if (filtro === 'todas') return true;
    return (cita.estado || 'Pendiente').toLowerCase() === filtro.toLowerCase();
  });

  const conteos = {
    todas: solicitudes.length,
    pendientes: solicitudes.filter((c) => (c.estado || 'Pendiente').toLowerCase() === 'pendiente').length,
    confirmadas: solicitudes.filter((c) => (c.estado || '').toLowerCase() === 'confirmada').length,
    canceladas: solicitudes.filter((c) => (c.estado || '').toLowerCase() === 'cancelada').length,
  };

  return (
    <TemplateAdmin>
      <div className="mb-4">
        <Subtitulo nivel="h2" texto="Gestión de Citas" clasesExtras="h4 fw-bold text-dark mb-1" />
        <Parrafo clasesExtras="text-muted">
          Revisa las citas agendadas, confírmalas, cancélalas o elimina registros obsoletos.
        </Parrafo>
      </div>

      
      <div className="d-flex flex-wrap gap-2 mb-4">
        <Boton
          tipoBoton="button"
          variante={filtro === 'todas' ? 'primary text-white' : 'outline-secondary'}
          texto={`Todas (${conteos.todas})`}
          onClick={() => setFiltro('todas')}
          clasesExtras="btn-sm"
        />
        <Boton
          tipoBoton="button"
          variante={filtro === 'pendiente' ? 'warning text-dark' : 'outline-warning text-dark'}
          texto={`Pendientes (${conteos.pendientes})`}
          onClick={() => setFiltro('pendiente')}
          clasesExtras="btn-sm"
        />
        <Boton
          tipoBoton="button"
          variante={filtro === 'confirmada' ? 'success text-white' : 'outline-success'}
          texto={`Confirmadas (${conteos.confirmadas})`}
          onClick={() => setFiltro('confirmada')}
          clasesExtras="btn-sm"
        />
        <Boton
          tipoBoton="button"
          variante={filtro === 'cancelada' ? 'danger text-white' : 'outline-danger'}
          texto={`Canceladas (${conteos.canceladas})`}
          onClick={() => setFiltro('cancelada')}
          clasesExtras="btn-sm"
        />
      </div>

      {solicitudesFiltradas.length === 0 ? (
        <div className="alert alert-light border text-center py-5 rounded-4 shadow-sm">
          <Parrafo clasesExtras="text-muted fs-6">
            No hay solicitudes en esta categoría.
          </Parrafo>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-3">Cliente</th>
                  <th className="py-3">Mascota</th>
                  <th className="py-3">Servicio</th>
                  <th className="py-3">Fecha y Hora</th>
                  <th className="py-3">Estado</th>
                  <th className="py-3 px-3 text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesFiltradas.map((cita) => {
                  const estadoActual = cita.estado || 'Pendiente';
                  const esPendiente = estadoActual.toLowerCase() === 'pendiente';
                  const esConfirmada = estadoActual.toLowerCase() === 'confirmada';
                  const varianteBadge = VARIANTES_ESTADO[estadoActual.toLowerCase()] || 'warning';

                  return (
                    <tr key={cita.id}>
                      <td className="px-3">
                        <div className="fw-bold text-dark">
                          {cita.cliente || cita.nombreCliente || cita.correo || 'Usuario'}
                        </div>
                        {cita.correo && (
                          <small className="text-muted d-block">{cita.correo}</small>
                        )}
                      </td>
                      <td>
                        <span className="fw-semibold text-dark">{cita.mascota || cita.nombreMascota || 'Mascota'}</span>
                        {cita.especie && (
                          <span className="badge bg-light text-secondary border ms-2">
                            {cita.especie}
                          </span>
                        )}
                      </td>
                      <td className="text-primary fw-medium">
                        {cita.servicio || 'Atención médica'}
                      </td>
                      <td>
                        <div className="fw-bold">{cita.fecha || 'Sin fecha'}</div>
                        <small className="text-muted">{cita.hora || cita.horario || ''}</small>
                      </td>
                      <td>
                        <Badge
                          variante={varianteBadge}
                          texto={estadoActual}
                          clasesExtras="px-2 py-1"
                        />
                      </td>
                      <td className="px-3 text-end">
                        <div className="d-flex justify-content-end gap-1">
                          
                          <Enlace
                              to={`/admin/solicitudes/${cita.id}`}
                              texto="Ver ficha"
                              clasesExtras="btn btn-sm btn-outline-primary"
                          />

                          {esPendiente && (
                            <Boton
                              tipoBoton="button"
                              variante="success"
                              texto="Confirmar"
                              onClick={() => manejarConfirmar(cita.id)}
                              clasesExtras="btn-sm text-white"
                            />
                          )}

                         
                          {(esPendiente || esConfirmada) && (
                            <Boton
                              tipoBoton="button"
                              variante="outline-warning"
                              texto="Cancelar"
                              onClick={() => abrirModalCancelar(cita.id)}
                              clasesExtras="btn-sm text-dark"
                            />
                          )}

                          
                          <Boton
                            tipoBoton="button"
                            variante="outline-danger"
                            texto="Borrar"
                            onClick={() => abrirModalEliminar(cita.id)}
                            clasesExtras="btn-sm"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ModalConfirmacion
        abierto={modal.abierto}
        titulo={modal.titulo}
        mensaje={modal.mensaje}
        onConfirmar={ejecutarAccionModal}
        onCancelar={cerrarModal}
        textoConfirmar={modal.textoBoton}
        textoCancelar="Volver"
        varianteConfirmar="danger"
      />
    </TemplateAdmin>
  );
}

export default AdminSolicitudes;