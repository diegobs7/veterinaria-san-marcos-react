import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Subtitulo from '../atoms/Subtitulo';
import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';
import CampoFormulario from '../molecules/CampoFormulario';
import DatoResumen from '../molecules/DatoResumen';
import AvatarPerfil from '../molecules/AvatarPerfil';

function FormularioPerfil(props) {
    const { usuario, valores, errores, onCambio } = props;

    return (
        <form
            className="p-4 border rounded shadow-sm bg-light"
            noValidate
            onSubmit={props.manejarSubmit}
        >
            <Row className="g-4">
                <Col xs={12} md={4}>
                    <AvatarPerfil foto={valores.foto} alt="Foto de perfil" />

                    <CampoFormulario
                        id="foto"
                        textoLabel="Cambiar foto"
                        tipo="file"
                        onChange={props.onCambioFoto}
                        error={errores.foto}
                        mensajeError={errores.foto}
                    />
                </Col>

                <Col xs={12} md={8}>
                    <Subtitulo nivel="h2" texto="Datos personales" clasesExtras="h4 text-primary mb-3" />

                    <div className="mb-3">
                        <DatoResumen etiqueta="Correo:" valor={usuario.correo} />
                        <DatoResumen etiqueta="RUT:" valor={usuario.rut || "No registrado"} />
                    </div>

                    <CampoFormulario
                        id="nombre"
                        textoLabel="Nombre completo"
                        placeholder="Nombre completo"
                        value={valores.nombre}
                        onChange={onCambio('nombre')}
                        error={errores.nombre}
                        mensajeError={errores.nombre}
                    />

                    <CampoFormulario
                        id="telefono"
                        textoLabel="Teléfono"
                        placeholder="+569xxxxxxxx"
                        value={valores.telefono}
                        onChange={onCambio('telefono')}
                        error={errores.telefono}
                        mensajeError={errores.telefono}
                    />

                    <CampoFormulario
                        id="direccion"
                        textoLabel="Dirección"
                        placeholder="Dirección"
                        value={valores.direccion}
                        onChange={onCambio('direccion')}
                        error={errores.direccion}
                        mensajeError={errores.direccion}
                    />
                </Col>
            </Row>

            {props.mensajePerfil && (
                <Parrafo clasesExtras="text-success fw-bold text-center mt-3">
                    {props.mensajePerfil}
                </Parrafo>
            )}

            <div className="d-grid col-12 col-md-4 mx-auto mt-3">
                <Boton tipoBoton="submit" texto="Guardar cambios" variante="primary" />
            </div>
        </form>
    );
}

export default FormularioPerfil;