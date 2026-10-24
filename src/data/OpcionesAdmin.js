import { ICONOS_CATEGORIA } from '../utils/categorias'

// Las categorías son las mismas que ya usa la tienda (cada una tiene su ícono).
export const CATEGORIAS = Object.keys(ICONOS_CATEGORIA).map((nombre) => ({
    valor: nombre,
    texto: nombre,
}));

// Textos que ya existen en Servicios.json; ObtenerEspeciesServicio los interpreta.
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
    { valor: "Administrador", texto: "Administrador" },
    { valor: "Cliente", texto: "Cliente" },
    { valor: "Vendedor", texto: "Vendedor" },
];

export const REGIONES = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "Libertador General Bernardo O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibáñez del Campo",
    "Magallanes y de la Antártica Chilena",
].map((texto) => ({ valor: texto, texto }));
