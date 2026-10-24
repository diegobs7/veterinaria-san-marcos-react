import {
    validarNombre,
    validarCorreo,
    validarContra,
    validarRut,
    validarDireccion,
    validarFechaNacimiento,
} from "./ValidarLogin_Registro";

export function validarNombreUsuario(valor) {
    return valor.trim().length > 50
        ? "El nombre no puede superar los 50 caracteres."
        : validarNombre(valor);
}

export function validarApellidos(valor) {
    const apellidos = valor.trim();

    if (apellidos === "") {
        return "Ingresa los apellidos.";
    }

    if (apellidos.length < 2) {
        return "Los apellidos son demasiado cortos.";
    }

    return apellidos.length > 100 ? "Los apellidos no pueden superar los 100 caracteres." : "";
}

export function validarDireccionUsuario(valor) {
    return valor.trim().length > 300
        ? "La dirección no puede superar los 300 caracteres."
        : validarDireccion(valor);
}

// Al editar, el correo no se cambia y la contraseña no se pide.
function validarUsuario(valores, esEdicion = false) {
    const revisiones = {
        rut: validarRut(valores.rut),
        nombre: validarNombreUsuario(valores.nombre),
        apellidos: validarApellidos(valores.apellidos),
        correo: esEdicion ? "" : validarCorreo(valores.correo),
        fechaNacimiento: validarFechaNacimiento(valores.fechaNacimiento),
        tipo: valores.tipo ? "" : "Selecciona el tipo de usuario.",
        region: valores.region ? "" : "Selecciona una región.",
        direccion: validarDireccionUsuario(valores.direccion),
        contra: esEdicion ? "" : validarContra(valores.contra),
    };

    // Deja solo los campos que tienen error
    return Object.fromEntries(Object.entries(revisiones).filter(([, mensaje]) => mensaje !== ""));
}

export default validarUsuario;
