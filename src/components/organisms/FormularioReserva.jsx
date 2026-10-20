import { useState } from "react";
import Subtitulo from "../atoms/Subtitulo";
import Boton from "../atoms/Boton";
import CampoFormulario from "../molecules/CampoFormulario";
import CampoSelector from "../molecules/CampoSelector";
import validarReserva from "../../utils/ValidarReserva";
import { HORARIOS } from "../../data/OpcionesReserva";
import Parrafo from '../atoms/Parrafo';

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
        setMensajeReserva("Reserva confirmada correctamente.");
        setValores(VALORES_INICIALES);
    } else {
        setMensajeReserva("");
        }
    };

    return (
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
                <Parrafo clasesExtras="text-success mt-3">{mensajeReserva}</Parrafo>
            )}
        </form>
    );
}

export default FormularioReserva;
