import { describe, it, expect } from 'vitest';
import validarServicio from './ValidarServicio';

describe('validarServicio', () => {
    const baseValida = {
        nombre: 'Consulta General',
        descripcion: 'Revisión completa',
        precio: '15000',
        categoria: 'Consultas',
        especie: 'Perro',
        duracion: '30 min',
    };

    it('acepta un servicio con todos los campos válidos', () => {
        expect(validarServicio(baseValida)).toEqual({});
    });

    it('rechaza un servicio sin nombre o precio negativo', () => {
        const errores = validarServicio({ ...baseValida, nombre: '', precio: '-500' });
        expect(errores.nombre).toBeDefined();
        expect(errores.precio).toBeDefined();
    });

    it('exige categoría, especie y duración', () => {
        const errores = validarServicio({ ...baseValida, categoria: '', especie: '', duracion: '' });
        expect(errores.categoria).toBeDefined();
        expect(errores.especie).toBeDefined();
        expect(errores.duracion).toBeDefined();
    });
});