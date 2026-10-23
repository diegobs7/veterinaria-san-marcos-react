import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Subtitulo from "../atoms/Subtitulo";
import Boton from "../atoms/Boton";
import CampoFormulario from "../molecules/CampoFormulario";
import CampoSelector from "../molecules/CampoSelector";

import ModalConfirmacion from "../molecules/ModalConfirmacion";
import validarReserva from "../../utils/validaciones/ValidarReserva";
import { HORARIOS } from "../../data/OpcionesReserva";
import Parrafo from '../atoms/Parrafo';

import { obtenerSesion } from "../../utils/sesionAdmin";
import { guardarCita } from "../../services/citasService";

const VALORES_INICIALES = {
    nombreMascota: '',
    especie: '',
    fecha: '',
    horario: ''
};

function FormularioReserva(props) {
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [errores, setErrores] = useState({});
    const [mensajeReserva, setMensajeReserva] = useState("");
    
    const [modalLoginAbierto, setModalLoginAbierto] = useState(false);
    
    const navigate = useNavigate();

    const manejarCambio = (campo) => (e) => {
        setValores({ ...valores, [campo]: e.target.value });
        setErrores({ ...errores, [campo]: "" });
        setMensajeReserva("");
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        const erroresValidacion = validarReserva(valores);
        setErrores(erroresValidacion);

        if (Object.keys(erroresValidacion).length === 0) {
            const sesion = obtenerSesion();
            
            if (!sesion) {
                setModalLoginAbierto(true);
                return;
            }

            const nuevaCita = {
                correo: sesion.correo,
                servicio: props.nombreServicio || "Consulta Veterinaria", 
                mascota: valores.nombreMascota,
                especie: valores.especie,
                fecha: valores.fecha,
                hora: valores.horario
            };

            const resultado = guardarCita(nuevaCita);

            if (resultado.success) {
                setMensajeReserva("¡Reserva confirmada! Visita la pestaña 'Mis citas' para verla.");
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

                <CampoFormulario
                    id="nombre-mascota"
                    textoLabel="Nombre de la mascota"
                    placeholder="Ej: Fido"
                    value={valores.nombreMascota}
                    onChange={manejarCambio("nombreMascota")}
                    error={errores.nombreMascota}
                    mensajeError={errores.nombreMascota}
                />

                <CampoSelector
                    id="tipo-especie"
                    textoLabel="Especie"
                    textoDefecto="Selecciona una especie"
                    opciones={props.especies}
                    value={valores.especie}
                    onChange={manejarCambio('especie')}
                    error={errores.especie}
                    mensajeError={errores.especie}
                />

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