import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';
import Imagen from '../atoms/Imagen';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import DatoResumen from '../molecules/DatoResumen';
import { CATEGORIAS, ESPECIES_SERVICIO } from '../../data/OpcionesAdmin';

function FormularioProducto(props) {
    const { valores, errores, onCambio } = props;

    return (
        <Row className="justify-content-center">
            <Col xs={12} lg={8}>
                <form
                    className="p-4 border rounded shadow-sm bg-light"
                    noValidate
                    onSubmit={props.manejarSubmit}
                >
                    <div className="mb-3">
                        {props.codigo ? (
                            <DatoResumen etiqueta="Código:" valor={props.codigo} />
                        ) : (
                            <Parrafo clasesExtras="text-muted small">
                                El código se genera automáticamente según la categoría.
                            </Parrafo>
                        )}
                    </div>

                    <CampoFormulario
                        id="nombre"
                        textoLabel="Nombre:"
                        placeholder="Nombre del producto"
                        value={valores.nombre}
                        onChange={onCambio('nombre')}
                        error={errores.nombre}
                        mensajeError={errores.nombre}
                    />

                    <CampoTextArea
                        id="descripcion"
                        textoLabel="Descripción:"
                        placeholder="Descripción (opcional)"
                        value={valores.descripcion}
                        onChange={onCambio('descripcion')}
                        error={errores.descripcion}
                        mensajeError={errores.descripcion}
                    />

                    <CampoFormulario
                        id="precio"
                        textoLabel="Precio:"
                        tipo="number"
                        placeholder="0"
                        value={valores.precio}
                        onChange={onCambio('precio')}
                        error={errores.precio}
                        mensajeError={errores.precio}
                    />

                    <CampoFormulario
                        id="stock"
                        textoLabel="Stock:"
                        tipo="number"
                        placeholder="0"
                        value={valores.stock}
                        onChange={onCambio('stock')}
                        error={errores.stock}
                        mensajeError={errores.stock}
                    />

                    <CampoFormulario
                        id="stock-critico"
                        textoLabel="Stock crítico (opcional):"
                        tipo="number"
                        placeholder="0"
                        value={valores.stockCritico}
                        onChange={onCambio('stockCritico')}
                        error={errores.stockCritico}
                        mensajeError={errores.stockCritico}
                    />

                    <CampoSelector
                        id="categoria"
                        textoLabel="Categoría:"
                        textoDefecto="Selecciona una categoría"
                        opciones={CATEGORIAS}
                        value={valores.categoria}
                        onChange={onCambio('categoria')}
                        error={errores.categoria}
                        mensajeError={errores.categoria}
                    />

                    <CampoSelector
                        id="especie"
                        textoLabel="Especie:"
                        textoDefecto="Selecciona una especie"
                        opciones={ESPECIES_SERVICIO}
                        value={valores.especie}
                        onChange={onCambio('especie')}
                        error={errores.especie}
                        mensajeError={errores.especie}
                    />

                    <CampoFormulario
                        id="duracion"
                        textoLabel="Duración:"
                        placeholder="Ej: 30 min"
                        value={valores.duracion}
                        onChange={onCambio('duracion')}
                        error={errores.duracion}
                        mensajeError={errores.duracion}
                    />

                    {valores.imagen && (
                        <Imagen src={valores.imagen} alt="Imagen del producto" clasesExtras="rounded mb-2 w-25" />
                    )}

                    <CampoFormulario
                        id="imagen"
                        textoLabel="Imagen (opcional):"
                        tipo="file"
                        onChange={props.onCambioImagen}
                        error={errores.imagen}
                        mensajeError={errores.imagen}
                    />

                    {props.mensaje && (
                        <Parrafo clasesExtras="text-success fw-bold text-center mt-3">
                            {props.mensaje}
                        </Parrafo>
                    )}

                    <div className="d-grid col-12 col-md-6 mx-auto mt-3">
                        <Boton tipoBoton="submit" texto={props.textoBoton} variante="primary" />
                    </div>
                </form>
            </Col>
        </Row>
    );
}

export default FormularioProducto;
