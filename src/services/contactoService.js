const CLAVE = "mensajesContacto";

function leer() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE)) ?? [];
    } catch {
        return [];
    }
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function registrarMensajeContacto(datos) {
    const nuevo = {
        ...datos,
        id: `mc${Date.now()}`,
        fecha: new Date().toISOString(),
    };

    guardar([...leer(), nuevo]);
    return nuevo;
}

export function listarMensajesContacto() {
    return leer();
}