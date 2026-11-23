import { describe, it, expect, vi, beforeEach } from 'vitest'

// Se simula la API: estas pruebas no necesitan el backend encendido
vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}))

import { api } from './api'
import {
  listarUsuarios,
  buscarUsuarioPorId,
  registrarUsuario,
  editarUsuario,
  desactivarUsuario,
  reactivarUsuario,
  eliminarUsuario,
} from './usuarioService'

// Así responde el backend (nombres del backend: email, rol)
const CAMILA_BACKEND = {
  id: 3,
  nombre: 'Camila',
  email: 'camila@duocuc.cl',
  rol: 'RECEPCIONISTA',
  aplicacion: 'VETERINARIA',
  activo: true,
  rut: '12.345.678-5',
  apellidos: 'Rojas',
  telefono: '+56912345678',
  fechaNacimiento: '2000-05-10',
  region: 'Metropolitana',
  direccion: 'Av. Siempre Viva 123',
}

// Así llegan los datos desde el formulario del admin (nombres de la página: correo, tipo)
const FORMULARIO = {
  nombre: 'Camila',
  apellidos: 'Rojas',
  rut: '12.345.678-5',
  correo: 'camila@duocuc.cl',
  telefono: '+56912345678',
  fechaNacimiento: '2000-05-10',
  tipo: 'Recepcionista',
  region: 'Metropolitana',
  direccion: 'Av. Siempre Viva 123',
}

// Error de Axios como lo entrega el backend (ApiError)
function errorDelBackend(status, message) {
  const error = new Error('Request failed with status code ' + status)
  error.response = { status, data: { status, message } }
  return error
}

describe('usuarioService con el backend', () => {
  beforeEach(() => vi.clearAllMocks())

  it('listarUsuarios llama a GET /usuarios y traduce los nombres a los de la página', async () => {
    api.get.mockResolvedValue({ data: [CAMILA_BACKEND] })

    const lista = await listarUsuarios()

    expect(api.get).toHaveBeenCalledWith('/usuarios')
    expect(lista[0].correo).toBe('camila@duocuc.cl')
    expect(lista[0].tipo).toBe('Recepcionista')
  })

  it('buscarUsuarioPorId devuelve null cuando el backend responde 404', async () => {
    api.get.mockRejectedValue(errorDelBackend(404, 'Usuario no encontrado'))

    expect(await buscarUsuarioPorId(99)).toBeNull()
    expect(api.get).toHaveBeenCalledWith('/usuarios/99')
  })

  it('registrarUsuario envía POST /usuarios con contraseña y el rol del backend', async () => {
    api.post.mockResolvedValue({ data: CAMILA_BACKEND })

    await registrarUsuario({ ...FORMULARIO, contra: 'clave12345' })

    const [ruta, cuerpo] = api.post.mock.calls[0]
    expect(ruta).toBe('/usuarios')
    expect(cuerpo.email).toBe('camila@duocuc.cl')
    expect(cuerpo.password).toBe('clave12345')
    expect(cuerpo.rol).toBe('RECEPCIONISTA')
  })

  it('un 409 por RUT repetido se muestra en el campo rut con el mensaje del backend', async () => {
    api.post.mockRejectedValue(errorDelBackend(409, 'El RUT ya está registrado'))

    await expect(registrarUsuario({ ...FORMULARIO, contra: 'clave12345' })).rejects.toMatchObject({
      campo: 'rut',
      message: 'El RUT ya está registrado',
    })
  })

  it('un 409 por correo repetido se muestra en el campo correo', async () => {
    api.post.mockRejectedValue(errorDelBackend(409, 'El correo ya está registrado'))

    await expect(registrarUsuario({ ...FORMULARIO, contra: 'clave12345' })).rejects.toMatchObject({
      campo: 'correo',
    })
  })

  it('editarUsuario sin cambio de rol solo hace PUT', async () => {
    api.put.mockResolvedValue({ data: CAMILA_BACKEND })

    await editarUsuario(3, FORMULARIO, 'Recepcionista')

    expect(api.put).toHaveBeenCalledWith('/usuarios/3', expect.objectContaining({ email: 'camila@duocuc.cl' }))
    expect(api.patch).not.toHaveBeenCalled()
  })

  it('editarUsuario con cambio de rol hace PUT y luego PATCH /usuarios/{id}/rol', async () => {
    api.put.mockResolvedValue({ data: CAMILA_BACKEND })
    api.patch.mockResolvedValue({ data: { ...CAMILA_BACKEND, rol: 'DUENO' } })

    const actualizado = await editarUsuario(3, { ...FORMULARIO, tipo: 'Cliente' }, 'Recepcionista')

    expect(api.patch).toHaveBeenCalledWith('/usuarios/3/rol', { rol: 'DUENO' })
    expect(actualizado.tipo).toBe('Cliente')
  })

  it('un error al cambiar el propio rol se muestra en el campo tipo', async () => {
    api.put.mockResolvedValue({ data: CAMILA_BACKEND })
    api.patch.mockRejectedValue(errorDelBackend(409, 'No puedes cambiar tu propio rol'))

    await expect(editarUsuario(1, { ...FORMULARIO, tipo: 'Cliente' }, 'Administrador')).rejects.toMatchObject({
      campo: 'tipo',
    })
  })

  it('desactivar, reactivar y eliminar llaman a la ruta que corresponde', async () => {
    api.delete.mockResolvedValue({})
    api.patch.mockResolvedValue({})

    await desactivarUsuario(3)
    await reactivarUsuario(3)
    await eliminarUsuario(3)

    expect(api.delete).toHaveBeenCalledWith('/usuarios/3')
    expect(api.patch).toHaveBeenCalledWith('/usuarios/3/activar')
    expect(api.delete).toHaveBeenCalledWith('/usuarios/3/eliminar')
  })
})
