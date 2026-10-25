import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Subtitulo from '../atoms/Subtitulo';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import CampoRadio from '../molecules/CampoRadio';
import MensajeRegistro from '../molecules/MensajeRegistro';
import { ESPECIES } from '../../data/OpcionesReserva';

const SEXOS = [
    { valor: 'macho', texto: 'Macho' },
    { valor: 'hembra', texto: 'Hembra' },
];

const ESTERILIZADA = [
    { valor: 'si', texto: 'Sí' },
    { valor: 'no', texto: 'No' },
];

function RegistroUsuario(props) {
    const { valores, errores, onCambio } = props;

    return (
        <form noValidate onSubmit={props.manejarSubmit}>
            <Row className="g-4">
                <Col xs={12} md={6}>
                    <section className="p-4 border rounded shadow-sm bg-light h-100">
                        <Subtitulo nivel="h2" texto="Datos Mascota" clasesExtras="h4 text-primary mb-3" />

                        <CampoFormulario
                            id="nombre-mascota"
                            textoLabel="Nombre Mascota:"
                            placeholder="Nombre Mascota"
                            value={valores.nombreMascota}
                            onChange={onCambio('nombreMascota')}
                            error={errores.nombreMascota}
                            mensajeError={errores.nombreMascota}
                        />

                        <CampoSelector
                            id="especie"
                            textoLabel="Especie:"
                            textoDefecto="Selecciona una especie"
                            opciones={ESPECIES}
                            value={valores.especie}
                            onChange={onCambio('especie')}
                            error={errores.especie}
                            mensajeError={errores.especie}
                        />

                        <CampoFormulario
                            id="raza"
                            textoLabel="Raza:"
                            placeholder="Raza"
                            value={valores.raza}
                            onChange={onCambio('raza')}
                            error={errores.raza}
                            mensajeError={errores.raza}
                        />

                        <CampoSelector
                            id="sexo"
                            textoLabel="Sexo:"
                            textoDefecto="Seleccionar una opción"
                            opciones={SEXOS}
                            value={valores.sexo}
                            onChange={onCambio('sexo')}
                            error={errores.sexo}
                            mensajeError={errores.sexo}
                        />

                        <CampoFormulario
                            id="fecha-nacimiento"
                            textoLabel="Fecha de nacimiento:"
                            tipo="date"
                            value={valores.fechaNacimiento}
                            onChange={onCambio('fechaNacimiento')}
                            error={errores.fechaNacimiento}
                            mensajeError={errores.fechaNacimiento}
                        />

                        <CampoTextArea
                            id="comentario"
                            textoLabel="Comentario (Opcional):"
                            rows={2}
                            value={valores.comentario}
                            onChange={onCambio('comentario')}
                        />

                        <CampoRadio
                            name="esterilizada"
                            textoLabel="¿La mascota está esterilizada?"
                            opciones={ESTERILIZADA}
                            value={valores.esterilizada}
                            onChange={onCambio('esterilizada')}
                        />
                    </section>
                </Col>

                <Col xs={12} md={6}>
                    <section className="p-4 border rounded shadow-sm bg-light h-100">
                        <Subtitulo nivel="h2" texto="Datos Dueño" clasesExtras="h4 text-primary mb-3" />

                        <CampoFormulario
                            id="nombre-completo"
                            textoLabel="Nombre Completo:"
                            placeholder="Nombre completo"
                            value={valores.nombreCompleto}
                            onChange={onCambio('nombreCompleto')}
                            error={errores.nombreCompleto}
                            mensajeError={errores.nombreCompleto}
                        />

                        <CampoFormulario
                            id="rut"
                            textoLabel="RUT:"
                            placeholder="xx.xxx.xxx-x"
                            value={valores.rut}
                            onChange={onCambio('rut')}
                            error={errores.rut}
                            mensajeError={errores.rut}
                        />

                        <CampoFormulario
                            id="telefono"
                            textoLabel="Teléfono:"
                            placeholder="+569xxxxxxxx"
                            value={valores.telefono}
                            onChange={onCambio('telefono')}
                            error={errores.telefono}
                            mensajeError={errores.telefono}
                        />

                        <CampoFormulario
                            id="correo"
                            textoLabel="Correo electrónico:"
                            tipo="email"
                            placeholder="correo@ejemplo.cl"
                            value={valores.correo}
                            onChange={onCambio('correo')}
                            error={errores.correo}
                            mensajeError={errores.correo}
                        />

                        <CampoFormulario
                            id="direccion"
                            textoLabel="Dirección:"
                            placeholder="Dirección"
                            value={valores.direccion}
                            onChange={onCambio('direccion')}
                            error={errores.direccion}
                            mensajeError={errores.direccion}
                        />

                        <CampoFormulario
                            id="contra"
                            textoLabel="Contraseña:"
                            tipo="password"
                            placeholder="Minimo 6 caracteres"
                            value={valores.contra}
                            onChange={onCambio('contra')}
                            error={errores.contra}
                            mensajeError={errores.contra}
                        />
                    </section>
                </Col>
            </Row>

            <div className={`mt-3 text-center fw-bold ${props.claseMensaje}`}>
                {props.mensajeRegistro}
            </div>

            <div className="d-grid col-12 col-md-4 mx-auto mt-3">
                <Boton tipoBoton="submit" texto="Registrar" variante="primary" />
            </div>

            <MensajeRegistro
                ruta="/login"
                textoEnlace="Iniciar sesión aquí"
                textoPregunta="¿Ya tienes una cuenta? "
            />
        </form>
    );
}

export default RegistroUsuario;
