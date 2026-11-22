import { describe, it, expect } from 'vitest'
import { loginRequestDto, registroRequestDto } from './auth.dto'

describe('DTO de autenticación', () => {
  it('login: normaliza el correo e indica la aplicación', () => {
    expect(loginRequestDto({ correo: '  Ana@Gmail.com ', contra: 'secreta123' })).toEqual({
      email: 'ana@gmail.com',
      password: 'secreta123',
      aplicacion: 'VETERINARIA',
    })
  })

  it('registro: solo envía los campos del contrato (nombre, email, password, aplicacion)', () => {
    const dto = registroRequestDto({
      nombreCompleto: ' Ana Pérez ',
      correo: 'ANA@gmail.com',
      contra: 'secreta123',
      rut: '12.345.678-5',
      telefono: '+56912345678',
    })
    expect(dto).toEqual({
      nombre: 'Ana Pérez',
      email: 'ana@gmail.com',
      password: 'secreta123',
      aplicacion: 'VETERINARIA',
    })
    expect(dto).not.toHaveProperty('rut')
    expect(dto).not.toHaveProperty('rol')
  })
})