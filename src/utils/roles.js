
export const ROLES = [
    { valor: 'ADMINISTRADOR', texto: 'Administrador' },
    { valor: 'RECEPCIONISTA', texto: 'Recepcionista' },
    { valor: 'DUENO', texto: 'Cliente' },
];


export function nombreRol(codigo) {
    const rol = ROLES.find((r) => r.valor === codigo);
    return rol ? rol.texto : codigo;
}


export function codigoRol(nombre) {
    const rol = ROLES.find((r) => r.texto === nombre);
    return rol ? rol.valor : nombre;
}