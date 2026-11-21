import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Subtitulo from '../atoms/Subtitulo';
import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';
import CampoFormulario from '../molecules/CampoFormulario';
import DatoResumen from '../molecules/DatoResumen';
import AvatarPerfil from '../molecules/AvatarPerfil';

function FormularioPerfil(props) {

    return (
        <form
            className="p-4 border rounded shadow-sm bg-light"
            noValidate
            onSubmit={props.manejarSubmit}
        >
            <Row className="g-4">
                <Col xs={12} md={4}>
                    <AvatarPerfil foto={props.valores.foto} alt="Foto de perfil" />

                    <CampoFormulario
                        id="foto"
                        textoLabel="Cambiar foto"
                        tipo="file"
                        onChange={props.onCambioFoto}
                        error={props.errores.foto}
                        mensajeError={props.errores.foto}
                    />
                </Col>

                <Col xs={12} md={8}>
                    <Subtitulo nivel="h2" texto="Datos personales" clasesExtras="h4 text-primary mb-3" />

                    <div className="mb-3">
                        <DatoResumen etiqueta="Correo:" valor={props.usuario.correo} />
                        <DatoResumen etiqueta="RUT:" valor={props.usuario.rut || "No registrado"} />
                    </div>

                    <CampoFormulario
                        id="nombre"
                        textoLabel="Nombre completo"
                        placeholder="Nombre completo"
                        value={props.valores.nombre}
                        onChange={props.onCambio('nombre')}
                        error={props.errores.nombre}
                        mensajeError={props.errores.nombre}
                    />

                    <CampoFormulario
                        id="telefono"
                        textoLabel="Teléfono"
                        placeholder="+569xxxxxxxx"
                        value={props.valores.telefono}
                        onChange={props.onCambio('telefono')}
                        error={props.errores.telefono}
                        mensajeError={props.errores.telefono}
                    />

                    <CampoFormulario
                        id="direccion"
                        textoLabel="Dirección"
                        placeholder="Dirección"
                        value={props.valores.direccion}
                        onChange={props.onCambio('direccion')}
                        error={props.errores.direccion}
                        mensajeError={props.errores.direccion}
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