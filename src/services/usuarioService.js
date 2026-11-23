import usuariosIniciales from "../data/usuarios.json";
import { normalizarRut } from "../utils/rut";
import { api } from "./api";
import { obtenerMensajeError } from "./apiErrores";
import { aUsuarioBackend, aUsuarioFrontend, aUsuarioNuevoBackend } from "../utils/usuarioMapper";
import { codigoRol } from "../utils/roles";

const CLAVE = "usuarios";
const oyentes = new Set();

export function suscribirCambiosUsuario(callback) {
  oyentes.add(callback);
  return () => oyentes.delete(callback);
}

function leer() {
  const guardado = localStorage.getItem(CLAVE);

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
    return [...usuariosIniciales];
  }

  try {
    return JSON.parse(guardado) ?? [];
  } catch {
    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
    return [...usuariosIniciales];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
  oyentes.forEach((notificar) => notificar());
}

export async function listarUsuarios() {
  const respuesta = await api.get("/usuarios");
  return respuesta.data.map(aUsuarioFrontend);
}

export function buscarUsuarioPorCorreo(correo) {
  if (!correo || typeof correo !== "string") return null;
  const buscado = correo.trim().toLowerCase();
  return leer().find((u) => u.correo?.trim().toLowerCase() === buscado) ?? null;
}

// Busca por RUT sin importar si viene con puntos o sin ellos
export function buscarUsuarioPorRut(rut) {
  const buscado = normalizarRut(rut);
  if (!buscado) return null;
  return leer().find((u) => normalizarRut(u.rut) === buscado) ?? null;
}

// Error que indica en qué campo del formulario debe mostrarse
function errorDeCampo(campo, mensaje) {
  const error = new Error(mensaje);
  error.campo = campo;
  return error;
}

function errorDeApi(error) {
  const mensaje = obtenerMensajeError(error);
  let campo;
  if (mensaje.includes("RUT")) campo = "rut";
  else if (mensaje.includes("rol")) campo = "tipo";
  else if (error.response?.status === 409) campo = "correo";
  return errorDeCampo(campo, mensaje);
}

export async function buscarUsuarioPorId(id) {
  if (!id) return null;
  try {
    const respuesta = await api.get(`/usuarios/${id}`);
    return aUsuarioFrontend(respuesta.data);
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw errorDeApi(error);
  }
}

export function tipoDeUsuario(usuario) {
  if (!usuario) return "Cliente";
  if (usuario.tipo) return usuario.tipo;
  return usuario.correo?.toLowerCase() === "admin@duocuc.cl" ? "Administrador" : "Cliente";
}

export function nombreCompleto(usuario) {
  if (!usuario) return "";
  return [usuario.nombre, usuario.apellidos].filter(Boolean).join(" ");
}

// POST /usuarios: el admin crea un usuario con su rol
export async function registrarUsuario(valores) {
  try {
    const respuesta = await api.post("/usuarios", aUsuarioNuevoBackend(valores));
    return aUsuarioFrontend(respuesta.data);
  } catch (error) {
    throw errorDeApi(error);
  }
}

export async function editarUsuario(id, valores, tipoAnterior) {
  try {
    const respuesta = await api.put(`/usuarios/${id}`, aUsuarioBackend(valores));
    if (valores.tipo !== tipoAnterior) {
      const conRolNuevo = await api.patch(`/usuarios/${id}/rol`, { rol: codigoRol(valores.tipo) });
      return aUsuarioFrontend(conRolNuevo.data);
    }
    return aUsuarioFrontend(respuesta.data);
  } catch (error) {
    throw errorDeApi(error);
  }
}

// Permite actualizar tanto por ID (recomendado para Admin) como por correo
export function actualizarUsuario(identificador, cambios) {
  const lista = leer();
  const busqueda = String(identificador).trim().toLowerCase();

  const existente = lista.find(
    (u) => String(u.id) === busqueda || u.correo?.trim().toLowerCase() === busqueda
  );

  if (!existente) {
    throw new Error(`No se encontró el usuario a actualizar`);
  }

  // Si intentan cambiar el correo, verificar que no colisione con otra cuenta
  if (cambios.correo) {
    const nuevoCorreo = cambios.correo.trim().toLowerCase();
    const ocupado = lista.find(
      (u) => u.id !== existente.id && u.correo?.trim().toLowerCase() === nuevoCorreo
    );
    if (ocupado) {
      throw errorDeCampo("correo", "El nuevo correo ya está registrado por otro usuario");
    }
  }

  // Si cambian el RUT, verificar que no lo tenga otra cuenta
  if (cambios.rut) {
    const nuevoRut = normalizarRut(cambios.rut);
    const ocupado = lista.find((u) => u.id !== existente.id && normalizarRut(u.rut) === nuevoRut);
    if (ocupado) {
      throw errorDeCampo("rut", "El RUT ya está registrado por otro usuario");
    }
  }

  const actualizado = {
    ...existente,
    ...cambios,
    id: existente.id,
  };

  guardar(lista.map((u) => (u.id === existente.id ? actualizado : u)));
  return actualizado;
}

// DELETE /usuarios/{id}: el backend no borra, deja la cuenta inactiva (activo = false)
export async function desactivarUsuario(id) {
  try {
    await api.delete(`/usuarios/${id}`);
  } catch (error) {
    throw errorDeApi(error);
  }
}

// PATCH /usuarios/{id}/activar: vuelve a habilitar una cuenta desactivada
export async function reactivarUsuario(id) {
  try {
    await api.patch(`/usuarios/${id}/activar`);
  } catch (error) {
    throw errorDeApi(error);
  }
}

// DELETE /usuarios/{id}/eliminar: borra la cuenta (no se puede deshacer)
export async function eliminarUsuario(id) {
  try {
    await api.delete(`/usuarios/${id}/eliminar`);
  } catch (error) {
    throw errorDeApi(error);
  }
}