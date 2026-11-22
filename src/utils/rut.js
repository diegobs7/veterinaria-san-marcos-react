// Deja el RUT en un solo formato para compararlo: sin puntos ni espacios y con K mayúscula.
// Así "12.345.678-k" y "12345678-K" cuentan como el mismo RUT.
export function normalizarRut(valor) {
    return String(valor ?? '').replace(/[.\s]/g, '').toUpperCase();
}