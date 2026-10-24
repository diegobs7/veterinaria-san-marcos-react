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
    const {
        mascotas,
        mostrarFormulario,
        onAlternarFormulario,
        valoresMascota,
        erroresMascota,
        onCambioMascota,
        manejarSubmitMascota,
        mensajeMascota
    } = props;

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
                    texto={mostrarFormulario ? "Cancelar" : "Agregar mascota"}
                    variante={mostrarFormulario ? "secondary" : "outline-primary"}
                    clasesExtras="btn-sm fw-bold"
                    onClick={onAlternarFormulario}
                />
            </div>

            {mensajeMascota && (
                <Parrafo clasesExtras="text-success fw-bold text-center mb-3">
                    {mensajeMascota}
                </Parrafo>
            )}

            {mostrarFormulario && (
                <form 
                    className="p-4 border rounded bg-white mb-4" 
                    noValidate 
                    onSubmit={manejarSubmitMascota}
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
                                value={valoresMascota.nombreMascota}
                                onChange={onCambioMascota('nombreMascota')}
                                error={erroresMascota.nombreMascota}
                                mensajeError={erroresMascota.nombreMascota}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <CampoSelector
                                id="especie"
                                textoLabel="Especie:"
                                textoDefecto="Selecciona una especie"
                                opciones={ESPECIES}
                                value={valoresMascota.especie}
                                onChange={onCambioMascota('especie')}
                                error={erroresMascota.especie}
                                mensajeError={erroresMascota.especie}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoFormulario
                                id="raza"
                                textoLabel="Raza:"
                                placeholder="Raza"
                                value={valoresMascota.raza}
                                onChange={onCambioMascota('raza')}
                                error={erroresMascota.raza}
                                mensajeError={erroresMascota.raza}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoSelector
                                id="sexo"
                                textoLabel="Sexo:"
                                textoDefecto="Seleccionar una opción"
                                opciones={SEXOS}
                                value={valoresMascota.sexo}
                                onChange={onCambioMascota('sexo')}
                                error={erroresMascota.sexo}
                                mensajeError={erroresMascota.sexo}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <CampoFormulario
                                id="fecha-nacimiento"
                                textoLabel="Fecha de nacimiento:"
                                tipo="date"
                                value={valoresMascota.fechaNacimiento}
                                onChange={onCambioMascota('fechaNacimiento')}
                                error={erroresMascota.fechaNacimiento}
                                mensajeError={erroresMascota.fechaNacimiento}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <CampoRadio
                                name="esterilizada"
                                textoLabel="¿La mascota está esterilizada?"
                                opciones={ESTERILIZADA}
                                value={valoresMascota.esterilizada}
                                onChange={onCambioMascota('esterilizada')}
                            />
                        </Col>

                        <Col xs={12}>
                            <CampoTextArea
                                id="comentario"
                                textoLabel="Comentario (Opcional):"
                                rows={2}
                                value={valoresMascota.comentario}
                                onChange={onCambioMascota('comentario')}
                            />
                        </Col>
                    </Row>

                    <div className="d-grid col-12 col-md-4 mx-auto mt-3">
                        <Boton tipoBoton="submit" texto="Guardar mascota" variante="primary" />
                    </div>
                </form>
            )}

            {!mascotas || mascotas.length === 0 ? (
                <Parrafo clasesExtras="text-secondary mb-0">
                    No tienes mascotas registradas actualmente.
                </Parrafo>
            ) : (
                <Row className="g-3">
                    {mascotas.map((mascota) => (
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