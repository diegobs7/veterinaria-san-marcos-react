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

export function registrarUsuario({ nombre, rut, telefono, correo, direccion, contra }) {
    if (buscarUsuarioPorCorreo(correo)) {
        throw new Error("Ya existe un usuario con ese correo");
    }

    const nuevo = {
        id: `u${Date.now()}`,
        nombre: nombre.trim(),
        rut: rut.trim(),
        telefono: telefono.trim(),
        correo: correo.trim(),
        direccion: direccion.trim(),
        contra: contra.trim(),
        foto: "",
    };

    guardar([...leer(), nuevo]);
    return nuevo;
}

export function actualizarUsuario(correo, cambios) {
    const lista = leer();
    const buscado = correo.trim().toLowerCase();
    const existente = lista.find((u) => u.correo.toLowerCase() === buscado);

    if (!existente) {
        throw new Error(`No existe un usuario con correo "${correo}"`);
    }

    const actualizado = { ...existente, ...cambios, id: existente.id, correo: existente.correo };

    guardar(lista.map((u) => (u.id === existente.id ? actualizado : u)));
    return actualizado;
}