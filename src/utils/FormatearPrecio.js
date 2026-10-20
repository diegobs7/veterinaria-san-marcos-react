function FormatearPrecio(valor) {
    return `$${valor.toLocaleString('es-CL')}`;
}

export default FormatearPrecio;