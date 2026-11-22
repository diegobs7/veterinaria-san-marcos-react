import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';
import Badge from '../atoms/Badge';
import Enlace from '../atoms/Enlace';

const VARIANTES_ESTADO = {
  confirmada: 'success',
  cancelada: 'danger',
  pendiente: 'warning',
};

function TablaSolicitudesAdmin(props) {
  const solicitudes = props.solicitudes || [];

  if (solicitudes.length === 0) {
    return (
      <div className="alert alert-light border text-center py-5 rounded-4 shadow-sm">
        <Parrafo clasesExtras="text-muted fs-6">
          No hay solicitudes en esta categoría.
        </Parrafo>
      </div>
    );
  }

  return (
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
            {solicitudes.map((cita) => {
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
                    <Badge variante={varianteBadge} texto={estadoActual} clasesExtras="px-2 py-1" />
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
                          onClick={() => props.onConfirmar(cita.id)}
                          clasesExtras="btn-sm text-white"
                        />
                      )}

                      {(esPendiente || esConfirmada) && (
                        <Boton
                          tipoBoton="button"
                          variante="outline-warning"
                          texto="Cancelar"
                          onClick={() => props.onSolicitarCancelacion(cita.id)}
                          clasesExtras="btn-sm text-dark"
                        />
                      )}

                      <Boton
                        tipoBoton="button"
                        variante="outline-danger"
                        texto="Borrar"
                        onClick={() => props.onEliminar(cita.id)}
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
  );
}

export default TablaSolicitudesAdmin;