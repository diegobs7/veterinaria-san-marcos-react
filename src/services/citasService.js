import { generarCodigoSolicitud } from '../utils/solicitudes';

const CLAVE = 'solicitudes';

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? [];
  } catch {
    return [];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export const guardarCita = (nuevaCita) => {
  const citas = leer();
  const cita = {
    ...nuevaCita,
    id: Date.now().toString(),
    codigo: generarCodigoSolicitud(citas),
    estado: 'Pendiente',
    creadaEn: new Date().toISOString(),
  };

  try {
     guardar([...citas, cita]);
   } catch {
     return { success: false, message: 'No pudimos guardar tu solicitud. Intenta nuevamente.' };
   }
  return {
    success: true,
    message: 'Solicitud de cita enviada.',
    cita,
  };
};

export const obtenerCitasUsuario = (correoUsuario) => {
  return leer().filter((cita) => cita.correo === correoUsuario);
};

// --- Funciones para el Administrador ---

export const obtenerTodasLasCitas = () => {
  return leer();
};

export const cambiarEstadoCita = (idCita, estado) => {
  guardar(leer().map((cita) => (cita.id === idCita ? { ...cita, estado } : cita)));
  return { success: true };
};

export const obtenerCitaPorId = (idCita) => {
  return leer().find((cita) => String(cita.id) === String(idCita)) ?? null;
};

export const confirmarCita = (idCita) => cambiarEstadoCita(idCita, 'Confirmada');

export const cancelarCita = (idCita) => cambiarEstadoCita(idCita, 'Cancelada');