import { validarNombre, validarTelefono, validarDireccion } from "./ValidarLogin_Registro";

const TIPOS_FOTO = ["image/jpeg", "image/png", "image/webp"];
const TAMANO_MAXIMO_FOTO = 500 * 1024;

export function validarFoto(archivo) {
    if (!archivo) {
        return "";
    }

    if (!TIPOS_FOTO.includes(archivo.type)) {
        return "La foto debe ser una imagen JPG, PNG o WEBP.";
    }

    if (archivo.size > TAMANO_MAXIMO_FOTO) {
        return "La foto no puede pesar más de 500 KB.";
    }

    return "";
}

function validarPerfil(valores) {
    const revisiones = {
        nombre: validarNombre(valores.nombre),
        telefono: validarTelefono(valores.telefono),
        direccion: validarDireccion(valores.direccion),
    };

    return Object.fromEntries(Object.entries(revisiones).filter(([, mensaje]) => mensaje !== ""));
}

export default validarPerfil;