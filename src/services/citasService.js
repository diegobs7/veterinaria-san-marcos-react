export const guardarCita = (nuevaCita) => {
    const citas = JSON.parse(localStorage.getItem('citas_clinica')) || [];
    
    nuevaCita.id = Date.now().toString(); 
    
    citas.push(nuevaCita);
    localStorage.setItem('citas_clinica', JSON.stringify(citas));
    return { success: true, message: 'Cita agendada con éxito.' };
};

export const obtenerCitasUsuario = (correoUsuario) => {
    const citas = JSON.parse(localStorage.getItem('citas_clinica')) || [];
    return citas.filter(cita => cita.correo === correoUsuario);
};


export const cancelarCita = (idCita) => {
    let citas = JSON.parse(localStorage.getItem('citas_clinica')) || [];
    citas = citas.filter(cita => cita.id !== idCita);
    localStorage.setItem('citas_clinica', JSON.stringify(citas));
    return { success: true };
};