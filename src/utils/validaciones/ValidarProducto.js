export function validarNombreProducto(valor) {
    const nombre = valor.trim();

    if (nombre === "") {
        return "Ingresa el nombre del producto.";
    }

    if (nombre.length > 100) {
        return "El nombre no puede superar los 100 caracteres.";
    }

    return "";
}

export function validarDescripcion(valor) {
    return valor.trim().length > 500 ? "La descripción no puede superar los 500 caracteres." : "";
}

export function validarPrecio(valor) {
    if (valor === "") {
        return "Ingresa el precio.";
    }

    const precio = Number(valor);

    if (!Number.isFinite(precio) || precio < 0) {
        return "El precio debe ser un número igual o mayor a 0.";
    }

    return "";
}

export function validarStock(valor) {
    if (valor === "") {
        return "Ingresa el stock.";
    }

    return /^\d+$/.test(valor) ? "" : "El stock debe ser un número entero igual o mayor a 0.";
}

// El stock crítico es opcional, pero si se ingresa debe ser un entero.
export function validarStockCritico(valor) {
    if (valor === "") {
        return "";
    }

    return /^\d+$/.test(valor) ? "" : "El stock crítico debe ser un número entero igual o mayor a 0.";
}

export function validarDuracion(valor) {
    const duracion = valor.trim();

    if (duracion === "") {
        return "Ingresa la duración, por ejemplo 30 min.";
    }

    return duracion.length > 20 ? "La duración no puede superar los 20 caracteres." : "";
}

function validarProducto(valores) {
    const revisiones = {
        nombre: validarNombreProducto(valores.nombre),
        descripcion: validarDescripcion(valores.descripcion),
        precio: validarPrecio(valores.precio),
        stock: validarStock(valores.stock),
        stockCritico: validarStockCritico(valores.stockCritico),
        categoria: valores.categoria ? "" : "Selecciona una categoría.",
        especie: valores.especie ? "" : "Selecciona una especie.",
        duracion: validarDuracion(valores.duracion),
    };

    // Deja solo los campos que tienen error
    return Object.fromEntries(Object.entries(revisiones).filter(([, mensaje]) => mensaje !== ""));
}

export default validarProducto;
