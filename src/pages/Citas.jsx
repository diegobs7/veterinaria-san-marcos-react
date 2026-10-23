import { useState, useEffect } from 'react';
import { useTituloPagina } from '../Hooks/useTituloPagina';

import TemplateCitas from '../components/templates/TemplateCitas';
import ListaCitasUsuario from '../components/organisms/ListaCitasUsuarios';
import ModalConfirmacion from '../components/molecules/ModalConfirmacion'; 
import Subtitulo from '../components/atoms/Subtitulo';

import { obtenerSesion } from '../utils/sesionAdmin';
import { obtenerCitasUsuario, cancelarCita } from '../services/citasService';

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

    return (
        <TemplateCitas>
            <Subtitulo 
                texto="Mis Citas Médicas" 
                clasesExtras="text-center text-primary fw-bold mb-5" 
            />
            
            <ListaCitasUsuario 
                citas={citas} 
                onCancelar={solicitarCancelacion}
            />

            <ModalConfirmacion 
                abierto={modalAbierto}
                titulo="Cancelar Cita"
                mensaje="¿Estás seguro de que deseas cancelar esta cita médica? Esta acción no se puede deshacer."
                onConfirmar={confirmarCancelacion}
                onCancelar={cerrarModal}
            />
        </TemplateCitas>
    );
}

export default Citas;