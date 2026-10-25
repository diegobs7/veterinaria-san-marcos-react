const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMINIOS_PERMITIDOS = ["duocuc.cl", "profesor.duoc.cl", "gmail.com"];

export function validarCorreo(valor) {
    const correo = valor.trim();

    if (correo === "" || correo.length > 100 || !PATRON_CORREO.test(correo)) {
        return "Ingresa un correo válido.";
    }

    const dominio = correo.split("@")[1].toLowerCase();

    if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
        const lista = DOMINIOS_PERMITIDOS.map((d) => `@${d}`).join(", ");
        return `Usa un correo con uno de estos dominios: ${lista}.`;
    }

    return "";
}

export function validarContra(valor) {
    const contra = valor.trim();

    if (contra === "" || contra.length < 6) {
        return "La contraseña debe tener un minimo de 6 caracteres";
    }

    return "";
}

export function validarNombre(valor) {
    const nombre = valor.trim();

    if (nombre === "") {
        return "Ningún nombre fue ingresado";
    }

    if (nombre.length < 3) {
        return "El nombre ingresado es demasiado corto";
    }

    return "";
}

export function validarRepetirContra(contra, repetida) {
    if (contra.trim() !== repetida.trim()) {
        return "Las contraseñas no coinciden";
    }

    return "";
}

export function validarCredenciales(usuario, contra) {
    const errores = {};

    if (!usuario) {
        errores.correo = "No existe una cuenta con ese correo. Regístrate para ingresar.";
    } else if (usuario.contra !== contra.trim()) {
        errores.contra = "La contraseña es incorrecta.";
    }

    return errores;
}

export function validarCorreoDisponible(usuarioExistente) {
    return usuarioExistente ? "Ya existe una cuenta con este correo." : "";
}





//Validaciones de Registro de mascota

export function validarNombreMascota(valor) {
    const nombre = valor.trim();

    if (nombre === "") {
        return "Ingresa el nombre de la mascota.";
    }

    if (nombre.length < 2) {
        return "El nombre debe tener al menos 2 caracteres.";
    }

    return "";
}

//Cambio de validacion, antes solo era matematico
export function validarRut(valor) {
    if (!valor || typeof valor !== "string") {
        return "Ingresa un RUT.";
    }

    const rutLimpio = valor.trim().replace(/[.\s]/g, "").toUpperCase();

    // Valida que tenga entre 7 y 8 dígitos, guion y dígito verificador (número o K)
    if (!/^\d{7,8}-[\dK]$/.test(rutLimpio)) {
        return "Ingresa un RUT con formato válido (ej: 12.345.678-5 o 12345678-5).";
    }

    return "";
}

export function validarTelefono(valor) {
    const telefono = valor.replace(/\s/g, "");

    if (!/^\+569\d{8}$/.test(telefono)) {
        return "Ingresa un teléfono con el formato +569xxxxxxxx.";
    }

    return "";
}

export function validarDireccion(valor) {
    const direccion = valor.trim();

    if (direccion === "") {
        return "Ingresa tu dirección.";
    }

    if (direccion.length < 5) {
        return "La dirección es demasiado corta.";
    }

    return "";
}


export function validarFechaNacimiento(valor) {
    if (valor.trim() === "") {
        return "Ingresa la fecha de nacimiento.";
    }

    const hoy = new Date().toLocaleDateString("en-CA");

    return valor > hoy ? "La fecha no puede ser posterior a hoy." : "";
}

export function validarRegistro(valores) {
    const revisiones = {
        nombreMascota: validarNombreMascota(valores.nombreMascota),
        especie: valores.especie ? "" : "Selecciona una especie.",
        raza: validarRaza(valores.raza),
        sexo: valores.sexo ? "" : "Selecciona el sexo.",
        fechaNacimiento: validarFechaNacimiento(valores.fechaNacimiento),
        nombreCompleto: validarNombre(valores.nombreCompleto),
        rut: validarRut(valores.rut),
        telefono: validarTelefono(valores.telefono),
        correo: validarCorreo(valores.correo),
        direccion: validarDireccion(valores.direccion),
        contra: validarContra(valores.contra),
    };

    return Object.fromEntries(Object.entries(revisiones).filter(([, mensaje]) => mensaje !== ""));
}




//Validacion de Login

function validarLogin(valores) {
    const errores = {};

    const mensajeCorreo = validarCorreo(valores.correo);
    if (mensajeCorreo) {
        errores.correo = mensajeCorreo;
    }

    const mensajeContra = validarContra(valores.contra);
    if (mensajeContra) {
        errores.contra = mensajeContra;
    }

    return errores;
}

export default validarLogin;

export function validarMascota(valores) {
    const revisiones = {
        nombreMascota: validarNombreMascota(valores.nombreMascota),
        especie: valores.especie ? "" : "Selecciona una especie.",
        raza: validarRaza(valores.raza),
        sexo: valores.sexo ? "" : "Selecciona el sexo.",
        fechaNacimiento: validarFechaNacimiento(valores.fechaNacimiento),
    };

    return Object.fromEntries(Object.entries(revisiones).filter(([, mensaje]) => mensaje !== ""));
}

export function validarRaza(valor) {
    const raza = valor.trim();

    if (raza === "") {
        return "Ingresa la raza de la mascota.";
    }

    if (raza.length < 2) {
        return "La raza debe tener al menos 2 caracteres.";
    }

    return "";
}
