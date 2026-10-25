import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitulo from "../atoms/Subtitulo";
import Boton from "../atoms/Boton";
import Enlace from "../atoms/Enlace";
import Parrafo from "../atoms/Parrafo";
import CampoFormulario from "../molecules/CampoFormulario";
import CampoSelector from "../molecules/CampoSelector";
import ModalConfirmacion from "../molecules/ModalConfirmacion";
import ResultadoSolicitud from "../molecules/ResultadoSolicitud";
import ErrorSolicitud from "../molecules/ErrorSolicitud";
import DatoResumen from "../molecules/DatoResumen";
import validarReserva from "../../utils/validaciones/ValidarReserva";
import { validarSolicitudCita } from "../../utils/solicitudes";
import { useServicios } from "../../context/ServiciosContext";
import { HORARIOS } from "../../data/OpcionesReserva";
import { filtrarMascotasCompatibles, crearOpcionesMascotas } from "../../utils/MascotasReserva";
import { obtenerSesion } from "../../utils/sesionAdmin";
import { guardarCita, obtenerCitasUsuario } from "../../services/citasService";
import { listarMascotasDeUsuario } from "../../services/mascotaService";
import { buscarUsuarioPorCorreo, nombreCompleto } from "../../services/usuarioService";

const VALORES_INICIALES = {
    mascotaId: '',
    fecha: '',
    horario: ''
};

function FormularioReserva(props) {
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [errores, setErrores] = useState({});
    const [solicitudEnviada, setSolicitudEnviada] = useState(null);
    const [errorSolicitud, setErrorSolicitud] = useState("");
    const [modalLoginAbierto, setModalLoginAbierto] = useState(false);

    const navigate = useNavigate();
    const { servicios } = useServicios();

    const sesion = obtenerSesion();
    const usuario = sesion ? buscarUsuarioPorCorreo(sesion.correo) : null;
    const nombreCliente = usuario ? nombreCompleto(usuario) : '';
    const correoCliente = sesion?.correo || '';

    const mascotasCompatibles = sesion
        ? filtrarMascotasCompatibles(listarMascotasDeUsuario(sesion.correo), props.especies)
        : [];

    const manejarCambio = (campo) => (e) => {
        setValores({ ...valores, [campo]: e.target.value });
        setErrores({ ...errores, [campo]: "" });
    };

    const manejarReintentar = () => {
        setSolicitudEnviada(null);
        setValores(VALORES_INICIALES);
        setErrores({});
    };

    const manejarReintentarError = () => {
         setErrorSolicitud("");
     };

    const manejarSubmit = (e) => {
        e.preventDefault();

        if (!sesion) {
            setModalLoginAbierto(true);
            return;
        }

        const erroresValidacion = validarReserva(valores);
        setErrores(erroresValidacion);

        if (Object.keys(erroresValidacion).length === 0) {
            const mascota = mascotasCompatibles.find((m) => m.id === valores.mascotaId);

            const nuevaCita = {
                correo: correoCliente,
                nombreCliente,
                servicioId: props.servicioId,
                servicio: props.nombreServicio || "Consulta Veterinaria",
                precio: props.precio,
                mascotaId: mascota.id,
                mascota: mascota.nombre,
                especie: mascota.especie,
                fecha: valores.fecha,
                hora: valores.horario
            };

            const problema = validarSolicitudCita(nuevaCita, {
                 servicios,
                 citas: obtenerCitasUsuario(correoCliente),
             });
             if (problema) {
                 setErrorSolicitud(problema);
                 return;
             }

            const resultado = guardarCita(nuevaCita);

            if (resultado.success && resultado.cita) {
                setSolicitudEnviada(resultado.cita);
                setValores(VALORES_INICIALES);
            } else {
                setErrorSolicitud(resultado.message);
            }
        }
    };

    const irAlLogin = () => {
        setModalLoginAbierto(false);
        navigate('/login');
    };

    const cerrarModal = () => {
        setModalLoginAbierto(false);
    };

    if (errorSolicitud) {
         return (
             <ErrorSolicitud
                 mensaje={errorSolicitud}
                 onReintentar={manejarReintentarError}
             />
         );
    }

    if (solicitudEnviada) {
        return (
            <ResultadoSolicitud
                solicitud={solicitudEnviada}
                onReintentar={manejarReintentar}
            />
        );
    }

    return (
        <>
            <form onSubmit={manejarSubmit} noValidate>
                <Subtitulo nivel="h2" texto="Agendar una cita" clasesExtras="h4 mb-3" />

                {sesion && (
                    <div className="bg-light border rounded-3 p-3 mb-3">
                        <Parrafo clasesExtras="fw-semibold mb-2 small text-uppercase text-muted">
                            Datos del solicitante
                        </Parrafo>
                        <DatoResumen
                            etiqueta="Nombre:"
                            valor={usuario?.nombre || '—'}
                        />
                        <DatoResumen
                            etiqueta="Apellidos:"
                            valor={usuario?.apellidos || '—'}
                        />
                        <DatoResumen etiqueta="Correo:" valor={correoCliente} />
                    </div>
                )}

                <CampoSelector
                    id="mascota-cita"
                    textoLabel="Mascota"
                    textoDefecto="Selecciona una mascota"
                    opciones={crearOpcionesMascotas(mascotasCompatibles)}
                    value={valores.mascotaId}
                    onChange={manejarCambio("mascotaId")}
                    error={errores.mascotaId}
                    mensajeError={errores.mascotaId}
                />

                {sesion && mascotasCompatibles.length === 0 && (
                    <Parrafo clasesExtras="text-muted small mb-3">
                        No tienes mascotas registradas compatibles con este servicio.{" "}
                        <Enlace to="/perfil" texto="Agrega una desde tu perfil" />
                    </Parrafo>
                )}

                <CampoFormulario
                    id="fecha-cita"
                    textoLabel="Fecha preferida"
                    tipo="date"
                    value={valores.fecha}
                    onChange={manejarCambio("fecha")}
                    error={errores.fecha}
                    mensajeError={errores.fecha}
                />

                <CampoSelector
                    id="hora-cita"
                    textoLabel="Hora preferida"
                    textoDefecto="Selecciona una hora"
                    opciones={HORARIOS}
                    value={valores.horario}
                    onChange={manejarCambio("horario")}
                    error={errores.horario}
                    mensajeError={errores.horario}
                />

                <Boton texto="Confirmar reserva" tipoBoton="submit" />
            </form>

            <ModalConfirmacion
                abierto={modalLoginAbierto}
                titulo="Inicio de sesión requerido"
                mensaje="Para agendar una cita médica para tu mascota, necesitas iniciar sesión en tu cuenta de cliente."
                textoConfirmar="Ir a Iniciar Sesión"
                textoCancelar="Cerrar"
                varianteConfirmar="primary"
                onConfirmar={irAlLogin}
                onCancelar={cerrarModal}
            />
        </>
    );
}

export default FormularioReserva;