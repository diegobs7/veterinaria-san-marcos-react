const CLAVE = "evaluaciones";

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

export function registrarEvaluacion(datos) {
    const nueva = {
        ...datos,
        id: `ev${Date.now()}`,
        fecha: new Date().toISOString(),
    };

    guardar([...leer(), nueva]);
    return nueva;
}

export function listarEvaluaciones() {
    return leer();
}