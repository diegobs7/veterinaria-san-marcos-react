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

    if (contra === "" || contra.length < 6 || contra.length > 10) {
        return "La contraseña debe tener entre 6 y 10 caracteres.";
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


export function validarRut(valor) {
    const rut = valor.replace(/[.\s]/g, "").toUpperCase();

    if (!/^\d{7,8}-[\dK]$/.test(rut)) {
        return "Ingresa un RUT válido, por ejemplo 12.345.678-5.";
    }

    const [cuerpo, digito] = rut.split("-");
    let suma = 0;
    let factor = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

    return digito === esperado ? "" : "El RUT ingresado no es válido.";
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
    if (valor === "") {
        return "";
    }

    const hoy = new Date().toLocaleDateString("en-CA");

    return valor > hoy ? "La fecha no puede ser posterior a hoy." : "";
}

export function validarRegistro(valores) {
    const revisiones = {
        nombreMascota: validarNombreMascota(valores.nombreMascota),
        especie: valores.especie ? "" : "Selecciona una especie.",
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