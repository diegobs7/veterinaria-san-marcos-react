import { describe, it, expect } from 'vitest'
import validarUsuario from './ValidarUsuario'

const VALIDOS = {
  rut: '12.345.678-5',
  nombre: 'Javiera',
  apellidos: 'Muñoz Reyes',
  correo: 'javiera@gmail.com',
  fechaNacimiento: '',
  tipo: 'Cliente',
  region: 'Maule',
  direccion: 'Calle Los Aromos 245',
  contra: 'abc123',
}

describe('validarUsuario', () => {
  it('no devuelve errores con datos válidos (la fecha de nacimiento es opcional)', () => {
    expect(validarUsuario(VALIDOS)).toEqual({})
  })

  it('marca los campos obligatorios vacíos', () => {
    const errores = validarUsuario({ ...VALIDOS, rut: '', apellidos: '', tipo: '', region: '' })
    expect(Object.keys(errores).sort()).toEqual(['apellidos', 'region', 'rut', 'tipo'])
  })

  it('al crear exige correo y contraseña; al editar no', () => {
    const sinCorreoNiContra = { ...VALIDOS, correo: '', contra: '' }
    expect(Object.keys(validarUsuario(sinCorreoNiContra)).sort()).toEqual(['contra', 'correo'])
    expect(validarUsuario(sinCorreoNiContra, true)).toEqual({})
  })

  it('rechaza una dirección de más de 300 caracteres', () => {
    expect(validarUsuario({ ...VALIDOS, direccion: 'a'.repeat(301) }).direccion).toBeDefined()
  })
})
