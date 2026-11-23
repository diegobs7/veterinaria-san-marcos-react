import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import TemplatePerfil from '../components/templates/TemplatePerfil';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { obtenerSesion } from '../utils/sesionAdmin';
import { buscarUsuarioPorId, editarUsuario } from '../services/usuarioService';
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
    const idSesion = sesion?.id;

    // Mientras llega la respuesta del backend se muestra lo que trae la sesión
    const [usuario, setUsuario] = useState(
        sesion ? { id: sesion.id, correo: sesion.correo, nombre: sesion.nombre } : null
    );
    const [cargado, setCargado] = useState(false);
    const [guardando, setGuardando] = useState(false);

    const [valores, setValores] = useState({
        nombre: sesion?.nombre ?? '',
        telefono: '',
        direccion: '',
        foto: '',
    });
    const [errores, setErrores] = useState({});
    const [mensajePerfil, setMensajePerfil] = useState('');

    // GET /usuarios/{id}: el backend deja que cada usuario vea su propia cuenta
    useEffect(() => {
        if (!idSesion) return;
        buscarUsuarioPorId(idSesion)
            .then((encontrado) => {
                if (!encontrado) return;
                setUsuario(encontrado);
                setValores((actuales) => ({
                    ...actuales,
                    nombre: encontrado.nombre,
                    telefono: encontrado.telefono,
                    direccion: encontrado.direccion,
                }));
                setCargado(true);
            })
            .catch(() => setMensajePerfil('No se pudieron cargar tus datos. Intenta de nuevo en un momento.'));
    }, [idSesion]);

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

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (guardando) return;

        // Sin los datos del backend no se guarda: el PUT reemplaza todos los campos y borraría el RUT, la región, etc.
        if (!cargado) {
            setMensajePerfil('Aún no se cargan tus datos. Espera un momento e intenta de nuevo.');
            return;
        }

        const nuevosErrores = validarPerfil(valores);
        if (errores.foto) {
            nuevosErrores.foto = errores.foto;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            setMensajePerfil('');
            return;
        }

        setGuardando(true);
        try {
            // PUT /usuarios/{id}: se envían también los datos que no se editan aquí (RUT, región...) para no perderlos
            const actualizado = await editarUsuario(usuario.id, {
                ...usuario,
                nombre: valores.nombre.trim(),
                telefono: valores.telefono.trim(),
                direccion: valores.direccion.trim(),
            }, usuario.tipo);
            setUsuario(actualizado);
            actualizarDatosDueno(usuario.correo, { telefonoDueno: valores.telefono.trim() });
            setMascotas(listarMascotasDeUsuario(usuario.correo));
            setMensajePerfil('Tus datos se guardaron correctamente.');
        } catch (error) {
            setMensajePerfil(error.message);
        } finally {
            setGuardando(false);
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