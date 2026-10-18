const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMINIOS_PERMITIDOS = ["duocuc.cl", "profesor.duoc.cl", "gmail.com"];

export function validarCorreo(correo) {
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

function validarLogin(valores) {
    const errores = {};

    const mensajeCorreo = validarCorreo(valores.correo.trim());
    if (mensajeCorreo) {
        errores.correo = mensajeCorreo;
    }

    const contra = valores.contra.trim();
    if (contra === "" || contra.length < 6 || contra.length > 10) {
        errores.contra = "La contraseña debe tener entre 6 y 10 caracteres.";
    }

    return errores;
}

export default validarLogin;