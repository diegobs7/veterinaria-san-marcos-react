import { ESPECIES } from '../data/OpcionesReserva';

const HEMBRAS = {
    perra: { valor: "perro", texto: "Perra" },
    gata: { valor: "gato", texto: "Gata" }
};

function obtenerEspeciesServicio(textoEspecie) {
    const palabras = textoEspecie
        .toLowerCase()
        .split('/')
        .map((palabra) => palabra.trim());

    if (palabras.includes("todas")) {
        return ESPECIES;
    }

    const opciones = palabras
        .map((palabra) =>
            HEMBRAS[palabra] || ESPECIES.find((especie) => especie.valor === palabra)
        )
        .filter(Boolean);

    return opciones.length > 0 ? opciones : ESPECIES;
}

export default obtenerEspeciesServicio;