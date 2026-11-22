import { codigoRol, nombreRol } from './roles';

    //para que el backend guarde "sin dato" en vez de ""
    function textoONull(valor) {
    const limpio = (valor ?? '').trim();
    return limpio === '' ? null : limpio;
    }

// Datos del formulario → cuerpo que espera el backend (PUT /usuarios/{id})
    export function aUsuarioBackend(valores) {
    return {
        nombre: valores.nombre.trim(),
        email: valores.correo.trim().toLowerCase(),
        rut: textoONull(valores.rut),
        apellidos: textoONull(valores.apellidos),
        telefono: textoONull(valores.telefono),
        fechaNacimiento: valores.fechaNacimiento || null,
        region: textoONull(valores.region),
        direccion: textoONull(valores.direccion),
        };
    }

// Igual que aUsuarioBackend, más la contraseña y el rol (POST /usuarios)
export function aUsuarioNuevoBackend(valores) {
    return {
        ...aUsuarioBackend(valores),
        password: valores.contra,
        rol: codigoRol(valores.tipo),
    };
}

// Respuesta del backend → objeto con los nombres que usan las páginas de la veterinaria
    export function aUsuarioFrontend(respuesta) {
    return {
        id: respuesta.id,
        nombre: respuesta.nombre ?? '',
        apellidos: respuesta.apellidos ?? '',
        rut: respuesta.rut ?? '',
        telefono: respuesta.telefono ?? '',
        correo: respuesta.email ?? '',
        fechaNacimiento: respuesta.fechaNacimiento ?? '',
        tipo: nombreRol(respuesta.rol),
        region: respuesta.region ?? '',
        direccion: respuesta.direccion ?? '',
        activo: respuesta.activo,
    };
}