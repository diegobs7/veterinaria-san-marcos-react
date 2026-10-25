import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Boton from '../atoms/Boton';
import Enlace from '../atoms/Enlace';
import Parrafo from '../atoms/Parrafo';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import DatoResumen from '../molecules/DatoResumen';
import { CATEGORIAS, ESPECIES_SERVICIO } from '../../data/OpcionesAdmin';

const normalizarOpciones = (lista = []) =>
  lista.map((item) =>
    typeof item === 'object' && item !== null && 'valor' in item
      ? item
      : { valor: item, texto: item }
  );

function FormularioServicio(props) {
  const { valores, errores, onCambio, codigo, esEdicion, manejarSubmit, mensaje, textoBoton } = props;

  return (
    <Row className="justify-content-center">
      <Col xs={12} lg={8}>
        <form
          className="p-4 border rounded-4 shadow-sm bg-light"
          noValidate
          onSubmit={manejarSubmit}
        >
          <div className="mb-3">
            {codigo ? (
              <div className="p-3 bg-white rounded border">
                <DatoResumen etiqueta="Código del servicio:" valor={codigo} />
              </div>
            ) : (
              <Parrafo clasesExtras="text-muted small">
                El código del servicio se generará automáticamente según la categoría seleccionada.
              </Parrafo>
            )}
          </div>

          <CampoFormulario
            id="nombre"
            textoLabel="Nombre del servicio:"
            placeholder="Ej: Consulta General, Vacunación Sextuple"
            value={valores.nombre}
            onChange={onCambio('nombre')}
            error={errores.nombre}
            mensajeError={errores.nombre}
          />

          <CampoTextArea
            id="descripcion"
            textoLabel="Descripción del servicio:"
            placeholder="Detalles sobre lo que incluye la atención (opcional)"
            value={valores.descripcion}
            onChange={onCambio('descripcion')}
            error={errores.descripcion}
            mensajeError={errores.descripcion}
          />

          <CampoFormulario
            id="precio"
            textoLabel="Precio ($ CLP):"
            tipo="number"
            placeholder="Ej: 15000"
            value={valores.precio}
            onChange={onCambio('precio')}
            error={errores.precio}
            mensajeError={errores.precio}
          />

          <CampoSelector
            id="categoria"
            textoLabel="Categoría:"
            textoDefecto="Selecciona una categoría"
            opciones={normalizarOpciones(CATEGORIAS)}
            value={valores.categoria}
            onChange={onCambio('categoria')}
            error={errores.categoria}
            mensajeError={errores.categoria}
          />

          <CampoSelector
            id="especie"
            textoLabel="Especie de atención:"
            textoDefecto="Selecciona una especie"
            opciones={normalizarOpciones(ESPECIES_SERVICIO)}
            value={valores.especie}
            onChange={onCambio('especie')}
            error={errores.especie}
            mensajeError={errores.especie}
          />

          <CampoFormulario
            id="duracion"
            textoLabel="Duración estimada:"
            placeholder="Ej: 30 min, 45 min"
            value={valores.duracion}
            onChange={onCambio('duracion')}
            error={errores.duracion}
            mensajeError={errores.duracion}
          />

          {mensaje && (
            <div className="alert alert-success text-center py-2 my-3 rounded-3 shadow-sm">
              <Parrafo clasesExtras="fw-bold mb-0">{mensaje}</Parrafo>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
            <Enlace
              to="/admin/servicios/listado"
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
        </form>
      </Col>
    </Row>
  );
}

export default FormularioServicio;