function validarReserva(valores) {
    const errores = {};

    if (!valores.mascotaId) {
        errores.mascotaId = "Selecciona una mascota.";
    }

    if (!valores.fecha) {
        errores.fecha = "Selecciona una fecha.";
    } else {
        const hoy = new Date().toLocaleDateString('en-CA');
        if (valores.fecha < hoy) {
            errores.fecha = "La fecha no puede ser anterior a hoy.";
        }
    }

    if (!valores.horario) {
        errores.horario = "Selecciona una hora.";
    }

    return errores;
}

export default validarReserva;