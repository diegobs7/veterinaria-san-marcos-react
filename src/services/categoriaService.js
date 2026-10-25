import { crearSlug } from '../utils/categorias';
import { listarServicios } from './servicioService';

const CLAVE = 'categorias';

const CATEGORIAS_INICIALES = [
  { id: 'cat-consultas', nombre: 'Consultas', slug: 'consultas', icono: '🩺', descripcion: 'Atención médica general y controles de rutina.' },
  { id: 'cat-vacunacion', nombre: 'Vacunación', slug: 'vacunacion', icono: '💉', descripcion: 'Esquemas de vacunas según especie y edad.' },
  { id: 'cat-cirugia', nombre: 'Cirugía', slug: 'cirugia', icono: '🏥', descripcion: 'Procedimientos quirúrgicos programados.' },
  { id: 'cat-desparasitacion', nombre: 'Desparasitación', slug: 'desparasitacion', icono: '💊', descripcion: 'Control de parásitos internos y externos.' },
  { id: 'cat-examenes', nombre: 'Exámenes', slug: 'examenes', icono: '🔬', descripcion: 'Análisis de laboratorio e imagenología.' },
  { id: 'cat-otros', nombre: 'Otros', slug: 'otros', icono: '🐾', descripcion: 'Servicios complementarios y especialidades.' },
];

function leer() {
  const guardado = localStorage.getItem(CLAVE);

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(CATEGORIAS_INICIALES));
    return [...CATEGORIAS_INICIALES];
  }

  try {
    return JSON.parse(guardado) ?? [];
  } catch {
    localStorage.setItem(CLAVE, JSON.stringify(CATEGORIAS_INICIALES));
    return [...CATEGORIAS_INICIALES];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

function generarId(nombre) {
  const base = crearSlug(nombre) || 'categoria';
  return `cat-${base}`;
}

export function listarCategorias() {
  return leer().sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

export function obtenerCategoria(id) {
  if (!id) return null;
  return leer().find((c) => c.id === id) ?? null;
}

export function obtenerCategoriaPorNombre(nombre) {
  if (!nombre) return null;
  const buscado = String(nombre).trim().toLowerCase();
  return leer().find((c) => c.nombre.toLowerCase() === buscado) ?? null;
}

export function crearCategoria(datos) {
  const lista = leer();
  const nombre = String(datos.nombre ?? '').trim();

  if (!nombre) {
    throw new Error('El nombre de la categoría es obligatorio.');
  }

  if (lista.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase())) {
    throw new Error('Ya existe una categoría con ese nombre.');
  }

  const slug = crearSlug(nombre);
  let id = generarId(nombre);

  if (lista.some((c) => c.id === id)) {
    id = `${id}-${Date.now().toString(36)}`;
  }

  const nueva = {
    id,
    nombre,
    slug,
    icono: String(datos.icono ?? '🐾').trim() || '🐾',
    descripcion: String(datos.descripcion ?? '').trim(),
  };

  guardar([...lista, nueva]);
  return nueva;
}

export function actualizarCategoria(id, cambios) {
  const lista = leer();
  const existente = lista.find((c) => c.id === id);

  if (!existente) {
    throw new Error(`No existe una categoría con id "${id}"`);
  }

  const nombre = cambios.nombre !== undefined
    ? String(cambios.nombre).trim()
    : existente.nombre;

  if (!nombre) {
    throw new Error('El nombre de la categoría es obligatorio.');
  }

  const duplicado = lista.find(
    (c) => c.id !== id && c.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (duplicado) {
    throw new Error('Ya existe otra categoría con ese nombre.');
  }

  const actualizado = {
    ...existente,
    nombre,
    slug: crearSlug(nombre),
    icono: cambios.icono !== undefined
      ? (String(cambios.icono).trim() || '🐾')
      : existente.icono,
    descripcion: cambios.descripcion !== undefined
      ? String(cambios.descripcion).trim()
      : existente.descripcion,
  };

  if (existente.nombre !== actualizado.nombre) {
    sincronizarNombreEnServicios(existente.nombre, actualizado.nombre);
  }

  guardar(lista.map((c) => (c.id === id ? actualizado : c)));
  return actualizado;
}

export function eliminarCategoria(id) {
  const lista = leer();
  const existente = lista.find((c) => c.id === id);

  if (!existente) {
    throw new Error(`No existe una categoría con id "${id}"`);
  }

  const servicios = listarServicios().filter((s) => s.categoria === existente.nombre);
  if (servicios.length > 0) {
    throw new Error(
      `No se puede eliminar: hay ${servicios.length} servicio(s) usando la categoría "${existente.nombre}". Reasígnalos antes.`
    );
  }

  guardar(lista.filter((c) => c.id !== id));
  return true;
}

export function contarServiciosPorCategoria() {
  const servicios = listarServicios();
  const conteo = {};
  servicios.forEach((s) => {
    const clave = s.categoria || 'Sin categoría';
    conteo[clave] = (conteo[clave] || 0) + 1;
  });
  return conteo;
}

function sincronizarNombreEnServicios(nombreAnterior, nombreNuevo) {
  try {
    const clave = 'servicios';
    const guardado = localStorage.getItem(clave);
    if (!guardado) return;

    const lista = JSON.parse(guardado);
    if (!Array.isArray(lista)) return;

    const actualizada = lista.map((s) =>
      s.categoria === nombreAnterior ? { ...s, categoria: nombreNuevo } : s
    );
    localStorage.setItem(clave, JSON.stringify(actualizada));
  } catch {
    // no bloqueamos la actualización de la categoría
  }
}

export function restablecerCategorias() {
  localStorage.removeItem(CLAVE);
}