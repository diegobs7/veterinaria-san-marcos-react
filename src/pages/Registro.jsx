import { useState } from 'react';
import TemplateRegistro from '../components/templates/TemplateRegistro';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [repetirContra, setRepetirContra] = useState('');

    const [mensajeRegistro, setMensajeRegistro] = useState('');
    const [claseMensaje, setClaseMensaje] = useState('');

    const [errorNombre, setErrorNombre] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorContra, setErrorContra] = useState(false);
    const [errorRepetirContra, setErrorRepetirContra] = useState(false);

    const manejarSubmit = (e) => {
        e.preventDefault();
        const patronCorreoRegistro = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        let formularioRegistro = true;

        setErrorNombre(false);
        setErrorCorreo(false);
        setErrorContra(false);
        setErrorRepetirContra(false);

        const valorNombre = nombre.trim();
        if (valorNombre === "" || valorNombre.length < 3) {
            formularioRegistro = false;
            setErrorNombre(true);
        } else {
            setErrorNombre(false);
        }

        const valorCorreo = correo.trim();
        if (valorCorreo === "" || valorCorreo.length > 100 || !patronCorreoRegistro.test(valorCorreo)) {
            formularioRegistro = false;
            setErrorCorreo(true);
        } else {
            setErrorCorreo(false);
        }

        const valorContra = contra.trim();
        if (valorContra === "" || valorContra.length < 4 || valorContra.length > 10) {
            formularioRegistro = false;
            setErrorContra(true);
        } else {
            setErrorContra(false);
        }

        const valorRepetir = repetirContra.trim();
        if (valorRepetir === "" || valorRepetir !== valorContra) {
            formularioRegistro = false;
            setErrorRepetirContra(true);
        } else {
            setErrorRepetirContra(false);
        }

        if (formularioRegistro) {
            setMensajeRegistro("¡Registro exitoso! Redirigiendo...");
            setClaseMensaje("text-success");
            navigate("/login");
        } else {
            setMensajeRegistro("");
        }
    };

    return (
        <TemplateRegistro
            nombre = {nombre}
            onChangeNombre = {(e) => setNombre(e.target.value)}
            errorNombre = {errorNombre}

            correo = {correo}
            onChangeCorreo = {(e) => setCorreo(e.target.value)}
            errorCorreo = {errorCorreo}

            contra = {contra}
            onChangeContra = {(e) => setContra(e.target.value)}
            errorContra = {errorContra}

            repetirContra = {repetirContra}
            onChangeRepetirContra = {(e) => setRepetirContra(e.target.value)}
            errorRepetirContra = {errorRepetirContra}

            mensajeRegistro = {mensajeRegistro}
            claseMensaje = {claseMensaje}
            manejarSubmit = {manejarSubmit}
        />
    );
}

export default Registro;