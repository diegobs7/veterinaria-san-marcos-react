import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import CampoRadio from '../molecules/CampoRadio';
import TarjetaMascota from '../molecules/TarjetaMascota';
import { ESPECIES } from '../../data/OpcionesReserva';

const SEXOS = [
    { valor: 'macho', texto: 'Macho' },
    { valor: 'hembra', texto: 'Hembra' },
];

const ESTERILIZADA = [
    { valor: 'si', texto: 'Sí' },
    { valor: 'no', texto: 'No' },
];

function ListaMascotasPerfil(props) {
    return (
        <section className="p-4 border rounded shadow-sm bg-light mt-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <Subtitulo 
                    nivel="h2" 
                    texto="Mis mascotas registradas" 
                    clasesExtras="h4 text-primary m-0" 
                />
                <Boton
                    tipoBoton="button"
                    texto={props.mostrarFormulario ? "Cancelar" : "Agregar mascota"}
                    variante={props.mostrarFormulario ? "secondary" : "outline-primary"}
                    clasesExtras="btn-sm fw-bold"
                    onClick={props.onAlternarFormulario}
                />
            </div>

            {props.mensajeMascota && (
                <Parrafo clasesExtras="text-success fw-bold text-center mb-3">
                    {props.mensajeMascota}
                </Parrafo>
            )}

            {props.mostrarFormulario && (
                <form 
                    className="p-4 border rounded bg-white mb-4" 
                    noValidate 
                    onSubmit={props.manejarSubmitMascota}
                >
                    <Subtitulo 
                        nivel="h3" 
                        texto="Registrar nueva mascota" 
                        clasesExtras="h5 text-primary mb-3" 
                    />

                    <Row className="g-3">
                        <Col xs={12} md={6}>
                            <CampoFormulario
                                id="nombre-mascota"
                                textoLabel="Nombre Mascota:"
                                placeholder="Nombre Mascota"
                                value={props.valoresMascota.nombreMascota}
                                onChange={props.onCambioMascota('nombreMascota')}
                                error={props.erroresMascota.nombreMascota}
                                mensajeError={props.erroresMascota.nombreMascota}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <CampoSelector
                                id="especie"
                                textoLabel="Especie:"
                                textoDefecto="Selecciona una especie"
                                opciones={ESPECIES}
                                value={props.valoresMascota.especie}
                                onChange={props.onCambioMascota('especie')}
                                error={props.erroresMascota.especie}
                                mensajeError={props.erroresMascota.especie}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoFormulario
                                id="raza"
                                textoLabel="Raza:"
                                placeholder="Raza"
                                value={props.valoresMascota.raza}
                                onChange={props.onCambioMascota('raza')}
                                error={props.erroresMascota.raza}
                                mensajeError={props.erroresMascota.raza}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoSelector
                                id="sexo"
                                textoLabel="Sexo:"
                                textoDefecto="Seleccionar una opción"
                                opciones={SEXOS}
                                value={props.valoresMascota.sexo}
                                onChange={props.onCambioMascota('sexo')}
                                error={props.erroresMascota.sexo}
                                mensajeError={props.erroresMascota.sexo}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <CampoFormulario
                                id="fecha-nacimiento"
                                textoLabel="Fecha de nacimiento:"
                                tipo="date"
                                value={props.valoresMascota.fechaNacimiento}
                                onChange={props.onCambioMascota('fechaNacimiento')}
                                error={props.erroresMascota.fechaNacimiento}
                                mensajeError={props.erroresMascota.fechaNacimiento}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <CampoRadio
                                name="esterilizada"
                                textoLabel="¿La mascota está esterilizada?"
                                opciones={ESTERILIZADA}
                                value={props.valoresMascota.esterilizada}
                                onChange={props.onCambioMascota('esterilizada')}
                            />
                        </Col>

                        <Col xs={12}>
                            <CampoTextArea
                                id="comentario"
                                textoLabel="Comentario (Opcional):"
                                rows={2}
                                value={props.valoresMascota.comentario}
                                onChange={props.onCambioMascota('comentario')}
                            />
                        </Col>
                    </Row>

                    <div className="d-grid col-12 col-md-4 mx-auto mt-3">
                        <Boton tipoBoton="submit" texto="Guardar mascota" variante="primary" />
                    </div>
                </form>
            )}

            {!props.mascotas || props.mascotas.length === 0 ? (
                <Parrafo clasesExtras="text-secondary mb-0">
                    No tienes mascotas registradas actualmente.
                </Parrafo>
            ) : (
                <Row className="g-3">
                    {props.mascotas.map((mascota) => (
                        <Col xs={12} md={6} key={mascota.id}>
                            <TarjetaMascota mascota={mascota} />
                        </Col>
                    ))}
                </Row>
            )}
        </section>
    );
}

export default ListaMascotasPerfil;