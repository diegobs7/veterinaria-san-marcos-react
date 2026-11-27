// Respuesta del backend → objeto que usan las páginas (mismos nombres que tenía Servicios.json)
export function aServicioFrontend(respuesta) {
    return {
        id: String(respuesta.id), // texto, para compararlo con useParams()
        codigo: respuesta.codigo,
        titulo: respuesta.titulo,
        categoria: respuesta.categoria, // nombre, por ejemplo "Vacunación"
        categoriaId: String(respuesta.categoriaId),
        categoriaSlug: respuesta.categoriaSlug,
        especie: respuesta.especie,
        duracion: respuesta.duracion,
        precio: respuesta.precio,
        descuento: respuesta.descuento ?? null, // null = no está en oferta
        observaciones: respuesta.observaciones ?? null,
        descripcion: respuesta.descripcion ?? '',
        incluye: respuesta.incluye ?? [],
    };
}

// Servicio del frontend → cuerpo de POST y PUT /servicios
export function aServicioBackend(servicio) {
    return {
        titulo: String(servicio.titulo ?? '').trim(),
        categoriaId: Number(servicio.categoriaId),
        especie: servicio.especie,
        duracion: String(servicio.duracion ?? '').trim(),
        precio: Number(servicio.precio),
        descuento: servicio.descuento ?? null,
        observaciones: servicio.observaciones ?? null,
        descripcion: String(servicio.descripcion ?? '').trim() || null,
        incluye: servicio.incluye ?? [],
    };
}