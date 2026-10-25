import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';

function obtenerBadgeClase(estado) {
  switch (estado?.toLowerCase()) {
    case 'confirmada':
      return 'bg-success text-white';
    case 'cancelada':
      return 'bg-danger text-white';
    case 'pendiente':
    default:
      return 'bg-warning text-dark';
  }
}

function TablaSolicitudesAdmin({ solicitudes = [], onConfirmar, onSolicitarCancelacion }) {
  if (solicitudes.length === 0) {
    return (
      <div className="alert alert-secondary text-center py-4 my-3">
        <Parrafo clasesExtras="mb-0 text-muted">
          No hay solicitudes que coincidan con el filtro seleccionado.
        </Parrafo>
      </div>
    );
  }

  return (
    <div className="table-responsive my-3 shadow-sm rounded">
      <table className="table table-hover align-middle mb-0 bg-white">
        <thead className="table-light">
          <tr>
            <th>ID / Código</th>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Fecha / Hora</th>
            <th>Mascota</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => {
            const estadoActual = solicitud.estado || 'Pendiente';
            const esPendiente = estadoActual.toLowerCase() === 'pendiente';
            const esConfirmada = estadoActual.toLowerCase() === 'confirmada';

            return (
              <tr key={solicitud.id}>
                <td className="fw-semibold text-secondary">
                  #{solicitud.codigo || solicitud.id}
                </td>
                <td>
                  <div className="fw-medium">{solicitud.cliente || solicitud.nombreCliente || 'Sin nombre'}</div>
                  <small className="text-muted">{solicitud.correo || solicitud.email}</small>
                </td>
                <td>{solicitud.servicio || solicitud.nombreServicio || 'Consulta general'}</td>
                <td>
                  <div>{solicitud.fecha || 'Sin fecha'}</div>
                  <small className="text-muted">{solicitud.hora || ''}</small>
                </td>
                <td>
                  {solicitud.mascota || solicitud.nombreMascota || 'No indicada'}
                  {solicitud.especie && (
                    <span className="badge bg-light text-dark ms-1 border">
                      {solicitud.especie}
                    </span>
                  )}
                </td>
                <td>
                  <span className={`badge px-2 py-1 rounded-pill ${obtenerBadgeClase(estadoActual)}`}>
                    {estadoActual}
                  </span>
                </td>
                <td className="text-end">
                  <div className="btn-group" role="group">
                    {esPendiente && (
                      <Boton
                        texto="Confirmar"
                        onClick={() => onConfirmar(solicitud.id)}
                        clasesExtras="btn btn-sm btn-success text-white"
                      />
                    )}
                    {(esPendiente || esConfirmada) && (
                      <Boton
                        texto="Cancelar"
                        onClick={() => onSolicitarCancelacion(solicitud.id)}
                        clasesExtras="btn btn-sm btn-outline-danger ms-1"
                      />
                    )}
                    {!esPendiente && !esConfirmada && (
                      <span className="text-muted small fst-italic me-2">Sin acciones</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSolicitudesAdmin;