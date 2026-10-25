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
  const cita = {
    ...nuevaCita,
    id: Date.now().toString(),
    estado: 'Pendiente',
    creadaEn: new Date().toISOString(),
  };

  guardar([...leer(), cita]);
  return { success: true, message: 'Solicitud de cita enviada.' };
};

export const obtenerCitasUsuario = (correoUsuario) => {
  return leer().filter((cita) => cita.correo === correoUsuario);
};

// --- Funciones para el Administrador ---

// Retorna todas las solicitudes registradas de todos los clientes
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