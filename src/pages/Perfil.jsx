import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import TemplatePerfil from '../components/templates/TemplatePerfil';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { obtenerSesion } from '../utils/sesionAdmin';
import { buscarUsuarioPorCorreo, actualizarUsuario } from '../services/usuarioService';
import {
    actualizarDatosDueno,
    listarMascotasDeUsuario,
    registrarMascota
} from '../services/mascotaService';
import validarPerfil, { validarFoto } from '../utils/validaciones/ValidarPerfil';
import { validarMascota } from '../utils/validaciones/ValidarLogin_Registro';

const VALORES_INICIALES_MASCOTA = {
    nombreMascota: '',
    especie: '',
    raza: '',
    sexo: '',
    fechaNacimiento: '',
    comentario: '',
    esterilizada: 'no',
};

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

    const [mascotas, setMascotas] = useState(() =>
        sesion ? listarMascotasDeUsuario(sesion.correo) : []
    );
    const [mostrarFormularioMascota, setMostrarFormularioMascota] = useState(false);
    const [valoresMascota, setValoresMascota] = useState(VALORES_INICIALES_MASCOTA);
    const [erroresMascota, setErroresMascota] = useState({});
    const [mensajeMascota, setMensajeMascota] = useState('');

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
            setMascotas(listarMascotasDeUsuario(usuario.correo));
            setMensajePerfil('Tus datos se guardaron correctamente.');
        } else {
            setMensajePerfil('');
        }
    };

    const alternarFormularioMascota = () => {
        setMostrarFormularioMascota((actual) => !actual);
        setValoresMascota(VALORES_INICIALES_MASCOTA);
        setErroresMascota({});
        setMensajeMascota('');
    };

    const manejarCambioMascota = (campo) => (e) => {
        setValoresMascota({ ...valoresMascota, [campo]: e.target.value });
        setErroresMascota({ ...erroresMascota, [campo]: '' });
        setMensajeMascota('');
    };

    const manejarSubmitMascota = (e) => {
        e.preventDefault();

        const nuevosErrores = validarMascota(valoresMascota);
        setErroresMascota(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            registrarMascota({
                correoDueno: usuario.correo.trim(),
                rutDueno: (usuario.rut ?? '').trim(),
                telefonoDueno: valores.telefono.trim(),
                nombre: valoresMascota.nombreMascota.trim(),
                especie: valoresMascota.especie,
                raza: valoresMascota.raza.trim(),
                sexo: valoresMascota.sexo,
                fechaNacimiento: valoresMascota.fechaNacimiento,
                comentario: valoresMascota.comentario.trim(),
                esterilizada: valoresMascota.esterilizada,
            });

            setMascotas(listarMascotasDeUsuario(usuario.correo));
            setValoresMascota(VALORES_INICIALES_MASCOTA);
            setMostrarFormularioMascota(false);
            setMensajeMascota('Mascota registrada correctamente.');
        } else {
            setMensajeMascota('');
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
            mascotas={mascotas}
            mostrarFormularioMascota={mostrarFormularioMascota}
            onAlternarFormularioMascota={alternarFormularioMascota}
            valoresMascota={valoresMascota}
            erroresMascota={erroresMascota}
            onCambioMascota={manejarCambioMascota}
            manejarSubmitMascota={manejarSubmitMascota}
            mensajeMascota={mensajeMascota}
        />
    );
}

export default Perfil;