import { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import MensajeRegistro from '../molecules/MensajeRegistro';
import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';

function IniciarSesion(props) {
    
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
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <Subtitulo texto="Inicio de sesion" clasesExtras="text-center text-primary mb-4"/>
                    <form className="p-4 border rounded shadow-sm bg-light" onSubmit={manejarSubmit} noValidate>
                        <CampoFormulario 
                            id="email"
                            textoLabel="Correo electronico"
                            tipo="email"
                            placeholder="ejemplo@duocuc.cl"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            error = {errorCorreo}
                        />
                        <CampoFormulario 
                            id="password"
                            textoLabel="Contraseña"
                            tipo="password"
                            placeholder="xxxxxxxx"
                            value={contra}
                            onChange={(e) => setContra(e.target.value)}
                            error = {errorContra}
                        />

                        <div className={`mt-3 text-center fw-bold ${claseMensaje}`}>
                            {mensajeLogin}
                        </div>

                        <div className="d-grid mt-4">
                            <Boton tipoBoton="submit" texto="Entrar" variante="primary" />
                        </div>
                        <MensajeRegistro href="#" textoEnlace="Registrate aqui" textoPregunta="¿Aún no tienes una cuenta?"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default IniciarSesion;