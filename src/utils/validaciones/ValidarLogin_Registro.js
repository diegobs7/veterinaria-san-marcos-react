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



export function validarNombre(valor){
    const nombre = valor.trim();

    if(nombre === ""){
        return "Ningún nombre fue ingresado"
    }

    if(nombre.length < 3){
        return "El nombre ingresado es demasiado corto"
    }
    
    return ""

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