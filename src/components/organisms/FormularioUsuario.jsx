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
    return (
        <Row className="justify-content-center">
            <Col xs={12} lg={8}>
                <form
                    className="p-4 border rounded-4 shadow-sm bg-light"
                    noValidate
                    onSubmit={props.manejarSubmit}
                >
                    <CampoFormulario
                        id="rut"
                        textoLabel="RUT:"
                        placeholder="12.345.678-5"
                        value={props.valores.rut}
                        onChange={props.onCambio('rut')}
                        error={props.errores.rut}
                        mensajeError={props.errores.rut}
                    />

                    <CampoFormulario
                        id="nombre"
                        textoLabel="Nombre:"
                        placeholder="Nombre"
                        value={props.valores.nombre}
                        onChange={props.onCambio('nombre')}
                        error={props.errores.nombre}
                        mensajeError={props.errores.nombre}
                    />

                    <CampoFormulario
                        id="apellidos"
                        textoLabel="Apellidos:"
                        placeholder="Apellidos"
                        value={props.valores.apellidos}
                        onChange={props.onCambio('apellidos')}
                        error={props.errores.apellidos}
                        mensajeError={props.errores.apellidos}
                    />

                    {props.esEdicion ? (
                        <div className="mb-3 p-3 bg-white rounded border">
                            <DatoResumen etiqueta="Correo registrado:" valor={props.valores.correo} />
                        </div>
                    ) : (
                        <CampoFormulario
                            id="correo"
                            textoLabel="Correo electrónico:"
                            tipo="email"
                            placeholder="correo@duocuc.cl"
                            value={props.valores.correo}
                            onChange={props.onCambio('correo')}
                            error={props.errores.correo}
                            mensajeError={props.errores.correo}
                        />
                    )}

                    <CampoFormulario
                        id="telefono"
                        textoLabel="Teléfono de contacto:"
                        placeholder="+56912345678"
                        value={props.valores.telefono}
                        onChange={props.onCambio('telefono')}
                        error={props.errores.telefono}
                        mensajeError={props.errores.telefono}
                    />

                    <CampoFormulario
                        id="fecha-nacimiento"
                        textoLabel="Fecha de nacimiento:"
                        tipo="date"
                        value={props.valores.fechaNacimiento}
                        onChange={props.onCambio('fechaNacimiento')}
                        error={props.errores.fechaNacimiento}
                        mensajeError={props.errores.fechaNacimiento}
                    />

                    <CampoSelector
                        id="tipo"
                        textoLabel="Tipo de usuario / Rol:"
                        textoDefecto="Selecciona un tipo"
                        opciones={normalizarOpciones(TIPOS_USUARIO)}
                        value={props.valores.tipo}
                        onChange={props.onCambio('tipo')}
                        error={props.errores.tipo}
                        mensajeError={props.errores.tipo}
                    />

                    <CampoSelector
                        id="region"
                        textoLabel="Región:"
                        textoDefecto="Selecciona una región"
                        opciones={normalizarOpciones(REGIONES)}
                        value={props.valores.region}
                        onChange={props.onCambio('region')}
                        error={props.errores.region}
                        mensajeError={props.errores.region}
                    />

                    <CampoTextArea
                        id="direccion"
                        textoLabel="Dirección:"
                        placeholder="Dirección completa de residencia"
                        value={props.valores.direccion}
                        onChange={props.onCambio('direccion')}
                        error={props.errores.direccion}
                        mensajeError={props.errores.direccion}
                    />

                    {!props.esEdicion && (
                        <CampoFormulario
                            id="contra"
                            textoLabel="Contraseña:"
                            tipo="password"
                            placeholder="6 a 10 caracteres"
                            value={props.valores.contra}
                            onChange={props.onCambio('contra')}
                            error={props.errores.contra}
                            mensajeError={props.errores.contra}
                        />
                    )}

                    {props.mensaje && (
                        <div className="alert alert-success text-center py-2 my-3 rounded-3 shadow-sm">
                            <Parrafo clasesExtras="fw-bold mb-0">
                                {props.mensaje}
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
                            texto={props.textoBoton}
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