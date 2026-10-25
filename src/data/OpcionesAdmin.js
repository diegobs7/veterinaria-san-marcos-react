import { listarCategorias } from '../services/categoriaService';

export function obtenerOpcionesCategorias() {
  return listarCategorias().map((c) => ({
    valor: c.nombre,
    texto: c.nombre,
  }));
}

export const CATEGORIAS = [
  { valor: 'Consultas', texto: 'Consultas' },
  { valor: 'Vacunación', texto: 'Vacunación' },
  { valor: 'Cirugía', texto: 'Cirugía' },
  { valor: 'Desparasitación', texto: 'Desparasitación' },
  { valor: 'Exámenes', texto: 'Exámenes' },
  { valor: 'Otros', texto: 'Otros' },
];

export const ESPECIES_SERVICIO = [
  'Perro / Gato',
  'Perro',
  'Gato',
  'Perra',
  'Gata',
  'Perra / Gata',
  'Ave / Conejo',
  'Todas',
].map((texto) => ({ valor: texto, texto }));

export const TIPOS_USUARIO = [
  { valor: 'Administrador', texto: 'Administrador' },
  { valor: 'Cliente', texto: 'Cliente' },
  { valor: 'Vendedor', texto: 'Vendedor' },
];

export const REGIONES = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana de Santiago',
  "Libertador General Bernardo O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén del General Carlos Ibáñez del Campo',
  'Magallanes y de la Antártica Chilena',
].map((texto) => ({ valor: texto, texto }));