// Respuesta del backend → objeto que usan las páginas
export function aCategoriaFrontend(respuesta) {
    return {
        id: String(respuesta.id), // texto, para compararlo con useParams()
        nombre: respuesta.nombre,
        slug: respuesta.slug,
        icono: respuesta.icono || '🐾',
        descripcion: respuesta.descripcion ?? '',
    };
}


export function aCategoriaBackend(valores) {
    return {
        nombre: String(valores.nombre ?? '').trim(),
        icono: String(valores.icono ?? '').trim() || null,
        descripcion: String(valores.descripcion ?? '').trim() || null,
    };
}