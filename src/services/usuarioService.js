import usuariosIniciales from "../data/usuarios.json";

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

export function listarUsuarios() {
  return leer();
}

export function buscarUsuarioPorCorreo(correo) {
  if (!correo || typeof correo !== "string") return null;
  const buscado = correo.trim().toLowerCase();
  return leer().find((u) => u.correo?.trim().toLowerCase() === buscado) ?? null;
}

export function buscarUsuarioPorId(id) {
  if (!id) return null;
  return leer().find((u) => String(u.id) === String(id)) ?? null;
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

// Registro defensivo: ningún campo undefined romperá la app con .trim()
export function registrarUsuario({
  nombre = "",
  apellidos = "",
  rut = "",
  telefono = "",
  correo = "",
  direccion = "",
  contra = "",
  tipo = "Cliente",
  region = "",
  fechaNacimiento = "",
}) {
  const correoLimpio = String(correo).trim().toLowerCase();

  if (!correoLimpio) {
    throw new Error("El correo electrónico es obligatorio");
  }

  if (buscarUsuarioPorCorreo(correoLimpio)) {
    throw new Error("Ya existe un usuario con ese correo");
  }

  const nuevo = {
    id: `u${Date.now()}`,
    nombre: String(nombre).trim(),
    apellidos: String(apellidos).trim(),
    rut: String(rut).trim(),
    telefono: String(telefono).trim(),
    correo: correoLimpio,
    direccion: String(direccion).trim(),
    contra: String(contra).trim(),
    foto: "",
    tipo: tipo || "Cliente",
    region: String(region).trim(),
    fechaNacimiento: String(fechaNacimiento).trim(),
  };

  const listaActual = leer();
  guardar([...listaActual, nuevo]);
  return nuevo;
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
      throw new Error("El nuevo correo ya está registrado por otro usuario");
    }
  }

  const actualizado = {
    ...existente,
    ...cambios,
    id: existente.id, // El ID original nunca se sobreescribe
  };

  guardar(lista.map((u) => (u.id === existente.id ? actualizado : u)));
  return actualizado;
}

// Elimina un usuario por su ID
export function eliminarUsuario(id) {
  const lista = leer();
  const filtrados = lista.filter((u) => String(u.id) !== String(id));
  guardar(filtrados);
  return true;
}