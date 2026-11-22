import { describe, it, expect } from 'vitest'
import { aUsuarioBackend, aUsuarioNuevoBackend, aUsuarioFrontend } from './usuarioMapper'

    const FORMULARIO = {
    rut: '12.345.678-5',
    nombre: ' Javiera ',
    apellidos: 'Muñoz Reyes',
    correo: 'Javiera@Gmail.com',
    telefono: '',
    fechaNacimiento: '',
    tipo: 'Cliente',
    region: 'Maule',
    direccion: 'Calle Los Aromos 245',
    contra: 'clave1234',
    }

    describe('usuarioMapper', () => {
    it('traduce el formulario a los nombres del backend y deja vacíos como null', () => {
        expect(aUsuarioBackend(FORMULARIO)).toEqual({
        nombre: 'Javiera',
        email: 'javiera@gmail.com',
        rut: '12.345.678-5',
        apellidos: 'Muñoz Reyes',
        telefono: null,
        fechaNacimiento: null,
        region: 'Maule',
        direccion: 'Calle Los Aromos 245',
        })
    })

    it('al crear agrega la contraseña y traduce el rol de pantalla al del backend', () => {
        const cuerpo = aUsuarioNuevoBackend(FORMULARIO)
        expect(cuerpo.password).toBe('clave1234')
        expect(cuerpo.rol).toBe('DUENO')
    })

    it('traduce la respuesta del backend a los nombres de la página', () => {
        const usuario = aUsuarioFrontend({
        id: 7,
        nombre: 'Javiera',
        email: 'javiera@gmail.com',
        rol: 'ADMINISTRADOR',
        activo: true,
        rut: null,
        apellidos: 'Muñoz',
        telefono: null,
        fechaNacimiento: '2000-05-10',
        region: null,
        direccion: null,
        })
        expect(usuario.correo).toBe('javiera@gmail.com')
        expect(usuario.tipo).toBe('Administrador')
        expect(usuario.rut).toBe('')
        expect(usuario.fechaNacimiento).toBe('2000-05-10')
        expect(usuario.activo).toBe(true)
    })
})