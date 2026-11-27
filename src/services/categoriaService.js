import { api } from './api';
import { crearErrorDeApi } from './apiErrores';
import { aCategoriaBackend, aCategoriaFrontend } from '../utils/categoriaMapper';

// GET /categorias (público). Se ordenan por nombre, como se mostraban antes
export async function listarCategorias() {
  try {
    const respuesta = await api.get('/categorias');
    return respuesta.data
      .map(aCategoriaFrontend)
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}

// GET /categorias/{id} (público). null si no existe
export async function obtenerCategoria(id) {
  if (!id) return null;
  try {
    const respuesta = await api.get(`/categorias/${id}`);
    return aCategoriaFrontend(respuesta.data);
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw crearErrorDeApi(error);
  }
}

// POST /categorias (admin). 409 si ya existe una con ese nombre
export async function crearCategoria(valores) {
  try {
    const respuesta = await api.post('/categorias', aCategoriaBackend(valores));
    return aCategoriaFrontend(respuesta.data);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}

// PUT /categorias/{id} (admin). El backend actualiza el slug con el nombre nuevo
export async function actualizarCategoria(id, valores) {
  try {
    const respuesta = await api.put(`/categorias/${id}`, aCategoriaBackend(valores));
    return aCategoriaFrontend(respuesta.data);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}

// DELETE /categorias/{id} (admin). 409 si la categoría todavía tiene servicios
export async function eliminarCategoria(id) {
  try {
    await api.delete(`/categorias/${id}`);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}
