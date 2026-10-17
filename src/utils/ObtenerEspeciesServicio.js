import { ESPECIES } from '../data/OpcionesReserva';

const PALABRAS_POR_ESPECIE = {
    perro: ["perro", "perra"],
    gato: ["gato", "gata"],
    conejo: ["conejo"],
    ave: ["ave"]
};

function ObtenerEspeciesServicio(textoEspecie) {
    const palabras = textoEspecie
        .toLowerCase()
        .split('/')
        .map((palabra) => palabra.trim());

    if (palabras.includes("todas")) {
        return ESPECIES;
    }

    const coincidencias = ESPECIES.filter((especie) =>
        (PALABRAS_POR_ESPECIE[especie.valor] || []).some((palabra) =>
            palabras.includes(palabra)
        )
    );

    return coincidencias.length > 0 ? coincidencias : ESPECIES;
}

export default ObtenerEspeciesServicio;