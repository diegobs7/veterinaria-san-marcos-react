import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import DatoResumen from '../molecules/DatoResumen';
import { TIPOS_USUARIO, REGIONES } from '../../data/OpcionesAdmin';

function FormularioUsuario(props) {
    const { valores, errores, onCambio, esEdicion } = props;

    return (
        <Row className="justify-content-center">
            <Col xs={12} lg={8}>
                <form
                    className="p-4 border rounded shadow-sm bg-light"
                    noValidate
                    onSubmit={props.manejarSubmit}
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
                        <div className="mb-3">
                            <DatoResumen etiqueta="Correo:" valor={valores.correo} />
                        </div>
                    ) : (
                        <CampoFormulario
                            id="correo"
                            textoLabel="Correo:"
                            tipo="email"
                            placeholder="correo@duocuc.cl"
                            value={valores.correo}
                            onChange={onCambio('correo')}
                            error={errores.correo}
                            mensajeError={errores.correo}
                        />
                    )}

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
                        textoLabel="Tipo de usuario:"
                        textoDefecto="Selecciona un tipo"
                        opciones={TIPOS_USUARIO}
                        value={valores.tipo}
                        onChange={onCambio('tipo')}
                        error={errores.tipo}
                        mensajeError={errores.tipo}
                    />

                    <CampoSelector
                        id="region"
                        textoLabel="Región:"
                        textoDefecto="Selecciona una región"
                        opciones={REGIONES}
                        value={valores.region}
                        onChange={onCambio('region')}
                        error={errores.region}
                        mensajeError={errores.region}
                    />

                    <CampoTextArea
                        id="direccion"
                        textoLabel="Dirección:"
                        placeholder="Dirección completa"
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

export default FormularioUsuario;
