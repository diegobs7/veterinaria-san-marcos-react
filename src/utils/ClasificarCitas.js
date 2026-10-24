const ESTADOS_ACTIVOS = ['Pendiente', 'Confirmada'];

function ahoraComoTexto() {
    const ahora = new Date();
    return `${ahora.toLocaleDateString('en-CA')} ${ahora.toTimeString().slice(0, 5)}`;
}

function momentoCita(cita) {
    return `${cita.fecha} ${cita.hora}`;
}

export function separarCitas(citas) {
    const ahora = ahoraComoTexto();

    const proximas = citas
        .filter((c) => ESTADOS_ACTIVOS.includes(c.estado) && momentoCita(c) >= ahora)
        .sort((a, b) => momentoCita(a).localeCompare(momentoCita(b)));

    const historial = citas
        .filter((c) => !proximas.includes(c))
        .sort((a, b) => momentoCita(b).localeCompare(momentoCita(a)));

    return { proximas, historial };
}