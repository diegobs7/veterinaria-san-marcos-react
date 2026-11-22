import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';
import Enlace from '../atoms/Enlace';
import DatoResumen from './DatoResumen';
import { formatearNumeroSolicitud } from '../../utils/solicitudes';
import { formatearPrecio } from '../../utils/precios';

function ResultadoSolicitud(props) {
  if (!props.solicitud) return null;

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
          valor={formatearNumeroSolicitud(props.solicitud)}
          clasesExtras="fs-5"
        />
        <DatoResumen etiqueta="Estado:" valor={props.solicitud.estado || 'Pendiente'} />
        <DatoResumen etiqueta="Servicio:" valor={props.solicitud.servicio} />
        <DatoResumen etiqueta="Mascota:" valor={`${props.solicitud.mascota} (${props.solicitud.especie})`} />
        <DatoResumen etiqueta="Fecha preferida:" valor={props.solicitud.fecha} />
        <DatoResumen etiqueta="Hora preferida:" valor={props.solicitud.hora} />
        {props.solicitud.precio !== undefined && (
          <DatoResumen etiqueta="Total referencial:" valor={formatearPrecio(props.solicitud.precio)} />
        )}
        {props.solicitud.correo && (
          <DatoResumen etiqueta="Correo:" valor={props.solicitud.correo} />
        )}
        {props.solicitud.nombreCliente && (
          <DatoResumen etiqueta="Cliente:" valor={props.solicitud.nombreCliente} />
        )}
      </div>

      <div className="d-flex flex-column gap-2">
        <Boton
          tipoBoton="button"
          texto="Nueva solicitud"
          variante="outline-primary"
          clasesExtras="w-100"
          onClick={props.onReintentar}
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