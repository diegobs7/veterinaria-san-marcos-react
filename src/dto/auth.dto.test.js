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

  it('registro: envía los datos de la cuenta y nunca el rol (lo asigna el servidor)', () => {
    const dto = registroRequestDto({
      nombreCompleto: ' Ana Pérez ',
      correo: 'ANA@gmail.com',
      contra: 'secreta123',
      rut: ' 12.345.678-5 ',
      telefono: '+56912345678',
      direccion: ' Av. Siempre Viva 123 ',
    })
    expect(dto).toEqual({
      nombre: 'Ana Pérez',
      email: 'ana@gmail.com',
      password: 'secreta123',
      aplicacion: 'VETERINARIA',
      rut: '12.345.678-5',
      telefono: '+56912345678',
      direccion: 'Av. Siempre Viva 123',
    })
    expect(dto).not.toHaveProperty('rol')
  })
})