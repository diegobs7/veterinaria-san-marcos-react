export function validarNombreCategoria(valor = '') {
  const nombre = valor.trim();
  if (nombre === '') return 'Ingresa el nombre de la categoría.';
  if (nombre.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
  if (nombre.length > 40) return 'El nombre no puede superar los 40 caracteres.';
  return '';
}

export function validarIconoCategoria(valor = '') {
  const icono = valor.trim();
  if (icono === '') return '';
  if (icono.length > 4) return 'El icono debe ser un solo emoji o símbolo corto.';
  return '';
}

export function validarDescripcionCategoria(valor = '') {
  return valor.trim().length > 200
    ? 'La descripción no puede superar los 200 caracteres.'
    : '';
}

function validarCategoria(valores) {
  const revisiones = {
    nombre: validarNombreCategoria(valores.nombre),
    icono: validarIconoCategoria(valores.icono),
    descripcion: validarDescripcionCategoria(valores.descripcion),
  };

  return Object.fromEntries(
    Object.entries(revisiones).filter(([, mensaje]) => mensaje !== '')
  );
}

export default validarCategoria;