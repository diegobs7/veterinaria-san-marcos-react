import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';
import Enlace from '../atoms/Enlace';
import DatoResumen from './DatoResumen';

function ResultadoSolicitud(props) {
  const { solicitud, onReintentar } = props;

  if (!solicitud) return null;

  return (
    <div className="border rounded-4 p-4 bg-white shadow-sm" role="status" aria-live="polite">
      <div className="text-center mb-3">
        <span className="fs-1" aria-hidden="true">✅</span>
        <Subtitulo
          nivel="h2"
          texto="Solicitud enviada"
          clasesExtras="h4 text-success fw-bold mt-2 mb-1"
        />
        <Parrafo clasesExtras="text-muted small mb-0">
          La clínica revisará tu solicitud y confirmará la hora.
        </Parrafo>
      </div>

      <div className="bg-light rounded-3 p-3 mb-3">
        <DatoResumen
          etiqueta="Nº de solicitud:"
          valor={`#${solicitud.id}`}
          clasesExtras="fs-5"
        />
        <DatoResumen etiqueta="Estado:" valor={solicitud.estado || 'Pendiente'} />
        <DatoResumen etiqueta="Servicio:" valor={solicitud.servicio} />
        <DatoResumen etiqueta="Mascota:" valor={`${solicitud.mascota} (${solicitud.especie})`} />
        <DatoResumen etiqueta="Fecha preferida:" valor={solicitud.fecha} />
        <DatoResumen etiqueta="Hora preferida:" valor={solicitud.hora} />
        {solicitud.correo && (
          <DatoResumen etiqueta="Correo:" valor={solicitud.correo} />
        )}
        {solicitud.nombreCliente && (
          <DatoResumen etiqueta="Cliente:" valor={solicitud.nombreCliente} />
        )}
      </div>

      <div className="d-flex flex-column gap-2">
        <Boton
          tipoBoton="button"
          texto="Reintentar / Nueva solicitud"
          variante="outline-primary"
          clasesExtras="w-100"
          onClick={onReintentar}
        />
        <Enlace
          to="/citas"
          texto="Ver mis citas"
          clasesExtras="btn btn-primary text-white w-100"
        />
      </div>
    </div>
  );
}

export default ResultadoSolicitud;