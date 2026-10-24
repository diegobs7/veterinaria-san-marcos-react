import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import TemplatePerfil from '../components/templates/TemplatePerfil';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { obtenerSesion } from '../utils/sesionAdmin';
import { buscarUsuarioPorCorreo, actualizarUsuario } from '../services/usuarioService';
import { actualizarDatosDueno } from '../services/mascotaService';
import validarPerfil, { validarFoto } from '../utils/validaciones/ValidarPerfil';

function Perfil() {
    useTituloPagina('Mi perfil');

    const sesion = obtenerSesion();
    const usuario = sesion ? buscarUsuarioPorCorreo(sesion.correo) : null;

    const [valores, setValores] = useState({
        nombre: usuario?.nombre ?? '',
        telefono: usuario?.telefono ?? '',
        direccion: usuario?.direccion ?? '',
        foto: usuario?.foto ?? '',
    });
    const [errores, setErrores] = useState({});
    const [mensajePerfil, setMensajePerfil] = useState('');

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const manejarCambio = (campo) => (e) => {
        setValores({ ...valores, [campo]: e.target.value });
        setErrores({ ...errores, [campo]: '' });
        setMensajePerfil('');
    };

    const manejarFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }

    const mensaje = validarFoto(archivo);
    if (mensaje) {
        setErrores({ ...errores, foto: mensaje });
        return;
    }

    const lector = new FileReader();
    lector.onload = () => {
        setValores((actuales) => ({ ...actuales, foto: lector.result }));
        setErrores((actuales) => ({ ...actuales, foto: '' }));
        setMensajePerfil('');
    };
    lector.readAsDataURL(archivo);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        const nuevosErrores = validarPerfil(valores);
        if (errores.foto) {
            nuevosErrores.foto = errores.foto;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            actualizarUsuario(usuario.correo, {
                nombre: valores.nombre.trim(),
                telefono: valores.telefono.trim(),
                direccion: valores.direccion.trim(),
                foto: valores.foto,
        });
        actualizarDatosDueno(usuario.correo, { telefonoDueno: valores.telefono.trim() });
        setMensajePerfil('Tus datos se guardaron correctamente.');
        } else {
        setMensajePerfil('');
        }
    };

    return (
        <TemplatePerfil
        usuario={usuario}
        valores={valores}
        errores={errores}
        onCambio={manejarCambio}
        onCambioFoto={manejarFoto}
        mensajePerfil={mensajePerfil}
        manejarSubmit={manejarSubmit}
        />
    );
}

export default Perfil;