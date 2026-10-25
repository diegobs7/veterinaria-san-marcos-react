export function validarNombreServicio(valor = '') {
  const nombre = valor.trim();
  if (nombre === '') return 'Ingresa el nombre del servicio.';
  if (nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (nombre.length > 100) return 'El nombre no puede superar los 100 caracteres.';
  return '';
}

export function validarDescripcion(valor = '') {
  return valor.trim().length > 500 ? 'La descripción no puede superar los 500 caracteres.' : '';
}

export function validarPrecio(valor = '') {
  if (valor === '' || valor === null || valor === undefined) {
    return 'Ingresa el precio del servicio.';
  }
  const precio = Number(valor);
  if (!Number.isFinite(precio) || precio < 0) {
    return 'El precio debe ser un número igual o mayor a 0.';
  }
  return '';
}

export function validarDuracion(valor = '') {
  const duracion = valor.trim();
  if (duracion === '') return 'Ingresa la duración estimada (ej: 30 min, 1 hr).';
  return duracion.length > 30 ? 'La duración no puede superar los 30 caracteres.' : '';
}

function validarServicio(valores) {
  const revisiones = {
    nombre: validarNombreServicio(valores.nombre),
    descripcion: validarDescripcion(valores.descripcion),
    precio: validarPrecio(valores.precio),
    categoria: valores.categoria ? '' : 'Selecciona una categoría.',
    especie: valores.especie ? '' : 'Selecciona una especie.',
    duracion: validarDuracion(valores.duracion),
  };

  return Object.fromEntries(Object.entries(revisiones).filter(([, mensaje]) => mensaje !== ''));
}

export default validarServicio;