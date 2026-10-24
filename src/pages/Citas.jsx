import { useState, useEffect } from 'react';
import { useTituloPagina } from '../Hooks/useTituloPagina';

import TemplateCitas from '../components/templates/TemplateCitas';
import ListaCitasUsuario from '../components/organisms/ListaCitasUsuarios';
import ModalConfirmacion from '../components/molecules/ModalConfirmacion';
import Subtitulo from '../components/atoms/Subtitulo';

import { obtenerSesion } from '../utils/sesionAdmin';
import { obtenerCitasUsuario, cancelarCita } from '../services/citasService';
import { separarCitas } from '../utils/ClasificarCitas';

function Citas() {
    useTituloPagina('Mis Citas');
    const [citas, setCitas] = useState([]);
    const [sesionActiva, setSesionActiva] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [idCitaSeleccionada, setIdCitaSeleccionada] = useState(null);

    useEffect(() => {
        const sesion = obtenerSesion();
        if (sesion) {
            setSesionActiva(sesion);
            cargarCitas(sesion.correo);
        }
    }, []);

    const cargarCitas = (correo) => {
        const misCitas = obtenerCitasUsuario(correo);
        setCitas(misCitas);
    };

    const solicitarCancelacion = (idCita) => {
        setIdCitaSeleccionada(idCita);
        setModalAbierto(true);
    };

    const confirmarCancelacion = () => {
        if (idCitaSeleccionada) {
            cancelarCita(idCitaSeleccionada);
            cargarCitas(sesionActiva.correo);
            setModalAbierto(false);
            setIdCitaSeleccionada(null);
        }
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setIdCitaSeleccionada(null);
    };

    const { proximas, historial } = separarCitas(citas);

    return (
        <TemplateCitas>
            <Subtitulo
                texto="Mis Citas Médicas"
                clasesExtras="text-center text-primary fw-bold mb-5"
            />

            <Subtitulo nivel="h3" texto="Próximas citas" clasesExtras="h4 mb-3" />
            <ListaCitasUsuario citas={proximas} onCancelar={solicitarCancelacion} />

            {historial.length > 0 && (
                <>
                    <Subtitulo nivel="h3" texto="Historial" clasesExtras="h4 mt-5 mb-3" />
                    <ListaCitasUsuario citas={historial} />
                </>
            )}

            <ModalConfirmacion
                abierto={modalAbierto}
                titulo="Cancelar Cita"
                mensaje="¿Estás seguro de que deseas cancelar esta cita médica? Quedará en tu historial como cancelada."
                onConfirmar={confirmarCancelacion}
                onCancelar={cerrarModal}
            />
        </TemplateCitas>
    );
}

export default Citas;