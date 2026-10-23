import usuariosIniciales from "../data/usuarios.json";

const CLAVE = "usuarios";

function leer() {
    const guardado = localStorage.getItem(CLAVE);

    if (guardado === null) {
        localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
        return [...usuariosIniciales];
    }

    try {
        return JSON.parse(guardado);
    } catch {
        localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
        return [...usuariosIniciales];
    }
    }

    function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
    }

    export function buscarUsuarioPorCorreo(correo) {
    const buscado = correo.trim().toLowerCase();
    return leer().find((u) => u.correo.toLowerCase() === buscado) ?? null;
    }

    export function registrarUsuario({ nombre, correo, contra }) {
    if (buscarUsuarioPorCorreo(correo)) {
        throw new Error("Ya existe un usuario con ese correo");
    }

    const nuevo = {
        id: `u${Date.now()}`,
        nombre: nombre.trim(),
        correo: correo.trim(),
        contra: contra.trim(),
    };

    guardar([...leer(), nuevo]);
    return nuevo;
}
