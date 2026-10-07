import { useState } from 'react';
import TemplateContacto from '../components/templates/TemplateContacto';

function Contacto() {

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [mensajeExito, setMensajeExito] = useState('');
    const [claseMensaje, setClaseMensaje] = useState('');

    const [errorNombre, setErrorNombre] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState(false);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const patronCorreo = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        let formularioValido = true;

        const valorNombre = nombre.trim();
        if (valorNombre === "" || valorNombre.length < 3) {
            formularioValido = false;
            setErrorNombre(true);
        } else {
            setErrorNombre(false);
        }

        const valorCorreo = correo.trim();
        if (valorCorreo === "" || valorCorreo.length > 100 || !patronCorreo.test(valorCorreo)) {
            formularioValido = false;
            setErrorCorreo(true);
        } else {
            setErrorCorreo(false);
        }

        const valorMensaje = mensaje.trim();
        if (valorMensaje === "" || valorMensaje.length > 500) {
            formularioValido = false;
            setErrorMensaje(true);
        } else {
            setErrorMensaje(false);
        }

        if (formularioValido) {
            setMensajeExito("¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.");
            setClaseMensaje("text-success");

            setNombre('');
            setCorreo('');
            setMensaje('');
        } else {
            setMensajeExito("");
        }
    };
    return (
        <TemplateContacto
            nombre={nombre}
            onChangeNombre={(e) => setNombre(e.target.value)}
            errorNombre={errorNombre}

            correo={correo}
            onChangeCorreo={(e) => setCorreo(e.target.value)}
            errorCorreo={errorCorreo}

            mensaje={mensaje}
            onChangeMensaje={(e) => setMensaje(e.target.value)}
            errorMensaje={errorMensaje}

            mensajeExito={mensajeExito}
            claseMensaje={claseMensaje}
            manejarSubmit={manejarSubmit}
        />
    );
}
export default Contacto;