import { ESPECIES } from '../data/OpcionesReserva';

const SOLO_HEMBRAS = ['Perra', 'Gata'];

export function filtrarMascotasCompatibles(mascotas, especiesPermitidas) {
    return mascotas.filter((mascota) =>
        especiesPermitidas.some(
            (especie) =>
                especie.valor === mascota.especie &&
                (!SOLO_HEMBRAS.includes(especie.texto) || mascota.sexo === 'hembra')
        )
    );
}

export function crearOpcionesMascotas(mascotas) {
    return mascotas.map((mascota) => {
        const especie = ESPECIES.find((e) => e.valor === mascota.especie)?.texto ?? mascota.especie;
        return { valor: mascota.id, texto: `${mascota.nombre} (${especie})` };
    });
}