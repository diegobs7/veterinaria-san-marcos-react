import { api } from './api';
import { crearErrorDeApi } from './apiErrores';
import { aServicioBackend, aServicioFrontend } from '../utils/servicioMapper';

// GET /servicios (público)
export async function listarServicios() {
  try {
    const respuesta = await api.get('/servicios');
    return respuesta.data.map(aServicioFrontend);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}

// GET /servicios/{id} (público). null si no existe
export async function obtenerServicio(id) {
  if (!id) return null;
  try {
    const respuesta = await api.get(`/servicios/${id}`);
    return aServicioFrontend(respuesta.data);
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw crearErrorDeApi(error);
  }
}

// POST /servicios (admin). El código (VA007…) lo genera el backend
export async function crearServicio(servicio) {
  try {
    const respuesta = await api.post('/servicios', aServicioBackend(servicio));
    return aServicioFrontend(respuesta.data);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}

// PUT /servicios/{id} (admin). Hay que mandar el servicio completo
export async function actualizarServicio(id, servicio) {
  try {
    const respuesta = await api.put(`/servicios/${id}`, aServicioBackend(servicio));
    return aServicioFrontend(respuesta.data);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}

// DELETE /servicios/{id} (admin)
export async function eliminarServicio(id) {
  try {
    await api.delete(`/servicios/${id}`);
  } catch (error) {
    throw crearErrorDeApi(error);
  }
}