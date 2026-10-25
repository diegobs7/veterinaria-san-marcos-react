import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoTextArea from '../molecules/CampoTextArea';
import Boton from '../atoms/Boton';
import Enlace from '../atoms/Enlace';
import Parrafo from '../atoms/Parrafo';
import Alerta from '../molecules/Alerta';

function FormularioCategoria(props) {
  const {
    valores,
    errores,
    onCambio,
    manejarSubmit,
    mensaje,
    textoBoton,
    esEdicion,
  } = props;

  return (
    <Row className="justify-content-center">
      <Col xs={12} lg={8}>
        <form
          className="p-4 border rounded-4 shadow-sm bg-light"
          noValidate
          onSubmit={manejarSubmit}
        >
          {mensaje && (
            <Alerta
              variante="success"
              titulo="Listo."
              texto={mensaje}
              clasesExtras="mb-3"
            />
          )}

          <CampoFormulario
            id="nombre"
            textoLabel="Nombre de la categoría:"
            tipo="text"
            placeholder="Ej: Consultas, Vacunación, Cirugía..."
            value={valores.nombre}
            onChange={onCambio('nombre')}
            error={errores.nombre}
            mensajeError={errores.nombre}
          />

          <CampoFormulario
            id="icono"
            textoLabel="Icono (emoji):"
            tipo="text"
            placeholder="Ej: 🩺  💉  🏥  💊  🔬  🐾"
            value={valores.icono}
            onChange={onCambio('icono')}
            error={errores.icono}
            mensajeError={errores.icono}
          />

          <div className="mb-3">
            <Parrafo clasesExtras="text-muted small mb-1">
              Vista previa del icono:
            </Parrafo>
            <span className="fs-2" aria-hidden="true">
              {valores.icono?.trim() || '🐾'}
            </span>
          </div>

          <CampoTextArea
            id="descripcion"
            textoLabel="Descripción (opcional):"
            placeholder="Breve descripción de qué tipo de servicios agrupa esta categoría."
            value={valores.descripcion}
            onChange={onCambio('descripcion')}
            error={errores.descripcion}
            mensajeError={errores.descripcion}
            rows={3}
          />

          <div className="d-flex flex-wrap gap-2 justify-content-between mt-4">
            <Enlace
              to="/admin/categorias/listado"
              texto="← Volver al listado"
              clasesExtras="btn btn-outline-secondary"
            />
            <Boton
              tipoBoton="submit"
              texto={textoBoton}
              variante="primary"
              clasesExtras="px-4 text-white fw-semibold"
            />
          </div>

          {esEdicion && (
            <Parrafo clasesExtras="text-muted small mt-3 mb-0">
              Si cambias el nombre, se actualizará automáticamente en los servicios
              que ya usan esta categoría.
            </Parrafo>
          )}
        </form>
      </Col>
    </Row>
  );
}

export default FormularioCategoria;