function ValidarEvaluacion(valores) {
    const errores = {};

    if (!valores.calificacion || valores.calificacion < 1 || valores.calificacion > 5) {
        errores.calificacion = "Selecciona una calificación de 1 a 5 estrellas.";
    }
    return errores;
}

export default ValidarEvaluacion;