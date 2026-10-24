import usuariosIniciales from "../data/usuarios.json";

const CLAVE = "usuarios";
const oyentes = new Set();

export function suscribirCambiosUsuario(callback) {
    oyentes.add(callback);
    return () => oyentes.delete(callback);
}

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
    oyentes.forEach((notificar) => notificar());
}

export function buscarUsuarioPorCorreo(correo) {
    const buscado = correo.trim().toLowerCase();
    return leer().find((u) => u.correo.toLowerCase() === buscado) ?? null;
}

export function listarUsuarios() {
    return leer();
}

export function buscarUsuarioPorId(id) {
    return leer().find((u) => u.id === id) ?? null;
}

// Los usuarios antiguos no tienen "tipo": el administrador sembrado sigue siendo admin.
export function tipoDeUsuario(usuario) {
    if (usuario.tipo) {
        return usuario.tipo;
    }

    return usuario.correo.toLowerCase() === "admin@duocuc.cl" ? "Administrador" : "Cliente";
}

export function nombreCompleto(usuario) {
    return [usuario.nombre, usuario.apellidos].filter(Boolean).join(" ");
}

export function registrarUsuario({
    nombre,
    rut,
    telefono = "",
    correo,
    direccion,
    contra,
    apellidos = "",
    tipo = "Cliente",
    region = "",
    fechaNacimiento = "",
}) {
    if (buscarUsuarioPorCorreo(correo)) {
        throw new Error("Ya existe un usuario con ese correo");
    }

    const nuevo = {
        id: `u${Date.now()}`,
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        rut: rut.trim(),
        telefono: telefono.trim(),
        correo: correo.trim(),
        direccion: direccion.trim(),
        contra: contra.trim(),
        foto: "",
        tipo,
        region,
        fechaNacimiento,
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