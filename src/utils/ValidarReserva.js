function validarReserva(valores) {
    const errores = {};

    if (!valores.nombreMascota.trim()) {
        errores.nombreMascota = "Ingresa el nombre de la mascota.";
    } else if (valores.nombreMascota.trim().length < 2) {
        errores.nombreMascota = "El nombre debe tener al menos 2 caracteres.";
    }

    if (!valores.especie) {
        errores.especie = "Selecciona una especie.";
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