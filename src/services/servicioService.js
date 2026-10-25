import serviciosIniciales from '../data/Servicios.json';
import { generarCodigo } from '../utils/codigos';

const CLAVE = 'servicios';

function leer() {
  const guardado = localStorage.getItem(CLAVE);

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales));
    return [...serviciosIniciales];
  }

  try {
    return JSON.parse(guardado) ?? [];
  } catch {
    localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales));
    return [...serviciosIniciales];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarServicios() {
  return leer();
}

export function obtenerServicio(id) {
  if (!id) return null;
  return leer().find((s) => s.id === id) ?? null;
}

export function crearServicio(datos) {
  const lista = leer();
  const codigo = generarCodigo ? generarCodigo(datos.categoria, lista) : `SRV${Date.now()}`;

  const nuevo = {
    id: codigo.toLowerCase(),
    codigo,
    titulo: String(datos.titulo ?? '').trim(),
    descripcion: String(datos.descripcion ?? '').trim(),
    categoria: datos.categoria ?? '',
    especie: datos.especie ?? '',
    duracion: String(datos.duracion ?? '').trim(),
    precio: Number(datos.precio) || 0,
    incluye: datos.incluye ?? [],
    observaciones: null,
  };

  guardar([...lista, nuevo]);
  return nuevo;
}

export function actualizarServicio(id, cambios) {
  const lista = leer();
  const existente = lista.find((s) => s.id === id);

  if (!existente) {
    throw new Error(`No existe un servicio con id "${id}"`);
  }

  const actualizado = {
    ...existente,
    ...cambios,
    id: existente.id,
    codigo: existente.codigo,
  };

  guardar(lista.map((s) => (s.id === id ? actualizado : s)));
  return actualizado;
}

export function eliminarServicio(id) {
  guardar(leer().filter((s) => s.id !== id));
  return true;
}

export function restablecerServicios() {
  localStorage.removeItem(CLAVE);
}