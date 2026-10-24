import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitulo from "../atoms/Subtitulo";
import Boton from "../atoms/Boton";
import Enlace from "../atoms/Enlace";
import Parrafo from "../atoms/Parrafo";
import CampoFormulario from "../molecules/CampoFormulario";
import CampoSelector from "../molecules/CampoSelector";
import ModalConfirmacion from "../molecules/ModalConfirmacion";
import validarReserva from "../../utils/validaciones/ValidarReserva";
import { HORARIOS } from "../../data/OpcionesReserva";
import { filtrarMascotasCompatibles, crearOpcionesMascotas } from "../../utils/MascotasReserva";
import { obtenerSesion } from "../../utils/sesionAdmin";
import { guardarCita } from "../../services/citasService";
import { listarMascotasDeUsuario } from "../../services/mascotaService";

const VALORES_INICIALES = {
    mascotaId: '',
    fecha: '',
    horario: ''
};

function FormularioReserva(props) {
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [errores, setErrores] = useState({});
    const [mensajeReserva, setMensajeReserva] = useState("");
    const [modalLoginAbierto, setModalLoginAbierto] = useState(false);

    const navigate = useNavigate();

    const sesion = obtenerSesion();
    const mascotasCompatibles = sesion
        ? filtrarMascotasCompatibles(listarMascotasDeUsuario(sesion.correo), props.especies)
        : [];

    const manejarCambio = (campo) => (e) => {
        setValores({ ...valores, [campo]: e.target.value });
        setErrores({ ...errores, [campo]: "" });
        setMensajeReserva("");
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
                correo: sesion.correo,
                servicio: props.nombreServicio || "Consulta Veterinaria",
                mascotaId: mascota.id,
                mascota: mascota.nombre,
                especie: mascota.especie,
                fecha: valores.fecha,
                hora: valores.horario
            };

            const resultado = guardarCita(nuevaCita);

            if (resultado.success) {
                setMensajeReserva("Solicitud enviada. La clínica confirmará tu hora; revisa el estado en 'Mis citas'.");
                setValores(VALORES_INICIALES);
            }
        } else {
            setMensajeReserva("");
        }
    };

    const irAlLogin = () => {
        setModalLoginAbierto(false);
        navigate('/login');
    };

    const cerrarModal = () => {
        setModalLoginAbierto(false);
    };

    return (
        <>
            <form onSubmit={manejarSubmit} noValidate>
                <Subtitulo nivel="h2" texto="Agendar una cita" clasesExtras="h4 mb-3" />

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

                {mensajeReserva && (
                    <Parrafo clasesExtras="text-success fw-bold mt-3">{mensajeReserva}</Parrafo>
                )}
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