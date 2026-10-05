import { useState } from 'react';
import TemplateLogin from '../components/templates/TemplateLogin';


function Login() {
    
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [mensajeLogin, setMensajeLogin] = useState('');
    const [claseMensaje, setClaseMensaje] = useState('');

    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorContra, setErrorContra] = useState(false);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const patronCorreoLogin = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        let formularioLogin = true;

        setErrorCorreo(false);
        setErrorContra(false);

        const valorCorreo = correo.trim();
        if (valorCorreo === "" || valorCorreo.length > 100 || !patronCorreoLogin.test(valorCorreo)) {
            formularioLogin = false;
            setErrorCorreo(true);
        }

        const valorContra = contra.trim();
        if (valorContra === "" || valorContra.length < 4 || valorContra.length > 10) {
            formularioLogin = false;
            setErrorContra(true);
        }

        if (formularioLogin) {
            if (valorCorreo === "admin@gmail.com" && valorContra === "1234") {
                setMensajeLogin("Accediendo como administrador....");
                setClaseMensaje("text-success");
                window.location.href = "/admin-home"; 
            } else {
                setMensajeLogin("Verificacion exitosa");
                setClaseMensaje("text-success");
            }
        } else {
            setMensajeLogin("Por favor, ingresa un correo valido y tu contrasena.");
            setClaseMensaje("text-danger");
        }
    };

    return(
        <TemplateLogin
        
            correo = {correo}
            onChangeCorreo = {(e) => setCorreo(e.target.value)}
            errorCorreo = {errorCorreo}


            contra = {contra}
            onChangeContra = {(e) => setContra(e.target.value)}
            errorContra = {errorContra}


            mensajeLogin = {mensajeLogin}
            claseMensaje = {claseMensaje}
            manejarSubmit = {manejarSubmit}
        />
    );
}

export default Login;