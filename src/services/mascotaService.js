const CLAVE = "mascotas";

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

export function registrarMascota(datos) {
    const nueva = {
        ...datos,
        id: `m${Date.now()}`,
    };

    guardar([...leer(), nueva]);
    return nueva;
}

export function listarMascotasDeUsuario(correo) {
    const buscado = correo.trim().toLowerCase();
    return leer().filter((m) => m.correoDueno.toLowerCase() === buscado);
}

export function actualizarDatosDueno(correo, cambios) {
    const buscado = correo.trim().toLowerCase();

    guardar(
        leer().map((m) =>
            m.correoDueno.toLowerCase() === buscado ? { ...m, ...cambios } : m
        )
    );
}