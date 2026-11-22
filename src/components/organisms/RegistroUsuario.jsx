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
                            value={props.valores.nombreMascota}
                            onChange={props.onCambio('nombreMascota')}
                            error={props.errores.nombreMascota}
                            mensajeError={props.errores.nombreMascota}
                        />

                        <CampoSelector
                            id="especie"
                            textoLabel="Especie:"
                            textoDefecto="Selecciona una especie"
                            opciones={ESPECIES}
                            value={props.valores.especie}
                            onChange={props.onCambio('especie')}
                            error={props.errores.especie}
                            mensajeError={props.errores.especie}
                        />

                        <CampoFormulario
                            id="raza"
                            textoLabel="Raza:"
                            placeholder="Raza"
                            value={props.valores.raza}
                            onChange={props.onCambio('raza')}
                            error={props.errores.raza}
                            mensajeError={props.errores.raza}
                        />

                        <CampoSelector
                            id="sexo"
                            textoLabel="Sexo:"
                            textoDefecto="Seleccionar una opción"
                            opciones={SEXOS}
                            value={props.valores.sexo}
                            onChange={props.onCambio('sexo')}
                            error={props.errores.sexo}
                            mensajeError={props.errores.sexo}
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

                        <CampoTextArea
                            id="comentario"
                            textoLabel="Comentario (Opcional):"
                            rows={2}
                            value={props.valores.comentario}
                            onChange={props.onCambio('comentario')}
                        />

                        <CampoRadio
                            name="esterilizada"
                            textoLabel="¿La mascota está esterilizada?"
                            opciones={ESTERILIZADA}
                            value={props.valores.esterilizada}
                            onChange={props.onCambio('esterilizada')}
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
                            value={props.valores.nombreCompleto}
                            onChange={props.onCambio('nombreCompleto')}
                            error={props.errores.nombreCompleto}
                            mensajeError={props.errores.nombreCompleto}
                        />

                        <CampoFormulario
                            id="rut"
                            textoLabel="RUT:"
                            placeholder="xx.xxx.xxx-x"
                            value={props.valores.rut}
                            onChange={props.onCambio('rut')}
                            error={props.errores.rut}
                            mensajeError={props.errores.rut}
                        />

                        <CampoFormulario
                            id="telefono"
                            textoLabel="Teléfono:"
                            placeholder="+569xxxxxxxx"
                            value={props.valores.telefono}
                            onChange={props.onCambio('telefono')}
                            error={props.errores.telefono}
                            mensajeError={props.errores.telefono}
                        />

                        <CampoFormulario
                            id="correo"
                            textoLabel="Correo electrónico:"
                            tipo="email"
                            placeholder="correo@ejemplo.cl"
                            value={props.valores.correo}
                            onChange={props.onCambio('correo')}
                            error={props.errores.correo}
                            mensajeError={props.errores.correo}
                        />

                        <CampoFormulario
                            id="direccion"
                            textoLabel="Dirección:"
                            placeholder="Dirección"
                            value={props.valores.direccion}
                            onChange={props.onCambio('direccion')}
                            error={props.errores.direccion}
                            mensajeError={props.errores.direccion}
                        />

                        <CampoFormulario
                            id="contra"
                            textoLabel="Contraseña:"
                            tipo="password"
                            placeholder="Minimo 6 caracteres"
                            value={props.valores.contra}
                            onChange={props.onCambio('contra')}
                            error={props.errores.contra}
                            mensajeError={props.errores.contra}
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