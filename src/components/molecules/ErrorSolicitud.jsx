import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';

function ErrorSolicitud(props) {
  return (
    <div className="border border-danger rounded-4 p-4 bg-white shadow-sm" role="alert">
      <div className="text-center mb-3">
        <span className="fs-1" aria-hidden="true">⚠️</span>
        <Subtitulo
          nivel="h2"
          texto="No pudimos registrar tu solicitud"
          clasesExtras="h4 text-danger fw-bold mt-2 mb-1"
        />
        <Parrafo clasesExtras="text-muted">{props.mensaje}</Parrafo>
      </div>

      <Boton
        tipoBoton="button"
        texto="Intentar de nuevo"
        clasesExtras="w-100"
        onClick={props.onReintentar}
      />
    </div>
  );
}

export default ErrorSolicitud;