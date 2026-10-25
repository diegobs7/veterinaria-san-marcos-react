import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Boton from '../atoms/Boton';
import Enlace from '../atoms/Enlace';
import Parrafo from '../atoms/Parrafo';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import DatoResumen from '../molecules/DatoResumen';
import { TIPOS_USUARIO, REGIONES } from '../../data/OpcionesAdmin';

// Normalizador defensivo: permite que OpcionesAdmin use tanto ['Admin', 'Cliente'] como [{ valor, texto }]
const normalizarOpciones = (lista = []) =>
    lista.map((item) =>
        typeof item === 'object' && item !== null && 'valor' in item
            ? item
            : { valor: item, texto: item }
    );

function FormularioUsuario(props) {
    const { valores, errores, onCambio, esEdicion, manejarSubmit, mensaje, textoBoton } = props;

    return (
        <Row className="justify-content-center">
            <Col xs={12} lg={8}>
                <form
                    className="p-4 border rounded-4 shadow-sm bg-light"
                    noValidate
                    onSubmit={manejarSubmit}
                >
                    <CampoFormulario
                        id="rut"
                        textoLabel="RUT:"
                        placeholder="12.345.678-5"
                        value={valores.rut}
                        onChange={onCambio('rut')}
                        error={errores.rut}
                        mensajeError={errores.rut}
                    />

                    <CampoFormulario
                        id="nombre"
                        textoLabel="Nombre:"
                        placeholder="Nombre"
                        value={valores.nombre}
                        onChange={onCambio('nombre')}
                        error={errores.nombre}
                        mensajeError={errores.nombre}
                    />

                    <CampoFormulario
                        id="apellidos"
                        textoLabel="Apellidos:"
                        placeholder="Apellidos"
                        value={valores.apellidos}
                        onChange={onCambio('apellidos')}
                        error={errores.apellidos}
                        mensajeError={errores.apellidos}
                    />

                    {esEdicion ? (
                        <div className="mb-3 p-3 bg-white rounded border">
                            <DatoResumen etiqueta="Correo registrado:" valor={valores.correo} />
                        </div>
                    ) : (
                        <CampoFormulario
                            id="correo"
                            textoLabel="Correo electrónico:"
                            tipo="email"
                            placeholder="correo@duocuc.cl"
                            value={valores.correo}
                            onChange={onCambio('correo')}
                            error={errores.correo}
                            mensajeError={errores.correo}
                        />
                    )}

                    {/* Campo Teléfono integrado para coincidir con usuarioService */}
                    <CampoFormulario
                        id="telefono"
                        textoLabel="Teléfono de contacto:"
                        placeholder="+56912345678"
                        value={valores.telefono}
                        onChange={onCambio('telefono')}
                        error={errores.telefono}
                        mensajeError={errores.telefono}
                    />

                    <CampoFormulario
                        id="fecha-nacimiento"
                        textoLabel="Fecha de nacimiento (opcional):"
                        tipo="date"
                        value={valores.fechaNacimiento}
                        onChange={onCambio('fechaNacimiento')}
                        error={errores.fechaNacimiento}
                        mensajeError={errores.fechaNacimiento}
                    />

                    <CampoSelector
                        id="tipo"
                        textoLabel="Tipo de usuario / Rol:"
                        textoDefecto="Selecciona un tipo"
                        opciones={normalizarOpciones(TIPOS_USUARIO)}
                        value={valores.tipo}
                        onChange={onCambio('tipo')}
                        error={errores.tipo}
                        mensajeError={errores.tipo}
                    />

                    <CampoSelector
                        id="region"
                        textoLabel="Región:"
                        textoDefecto="Selecciona una región"
                        opciones={normalizarOpciones(REGIONES)}
                        value={valores.region}
                        onChange={onCambio('region')}
                        error={errores.region}
                        mensajeError={errores.region}
                    />

                    <CampoTextArea
                        id="direccion"
                        textoLabel="Dirección:"
                        placeholder="Dirección completa de residencia"
                        value={valores.direccion}
                        onChange={onCambio('direccion')}
                        error={errores.direccion}
                        mensajeError={errores.direccion}
                    />

                    {!esEdicion && (
                        <CampoFormulario
                            id="contra"
                            textoLabel="Contraseña:"
                            tipo="password"
                            placeholder="6 a 10 caracteres"
                            value={valores.contra}
                            onChange={onCambio('contra')}
                            error={errores.contra}
                            mensajeError={errores.contra}
                        />
                    )}

                    {mensaje && (
                        <div className="alert alert-success text-center py-2 my-3 rounded-3 shadow-sm">
                            <Parrafo clasesExtras="fw-bold mb-0">
                                {mensaje}
                            </Parrafo>
                        </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
                        <Enlace
                            to="/admin/usuarios/listado"
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

export default FormularioUsuario;