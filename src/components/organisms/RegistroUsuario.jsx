import { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import MensajeRegistro from '../molecules/MensajeRegistro';
import Subtitulo from '../atoms/Subtitulo';
import Parrafo from '../atoms/Parrafo';

function RegistrarUsuario() {
    
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
        }

        const valorCorreo = correo.trim();
        if (valorCorreo === "" || valorCorreo.length > 100 || !patronCorreoRegistro.test(valorCorreo)) {
            formularioRegistro = false;
            setErrorCorreo(true);
        }

        const valorContra = contra.trim();
        if (valorContra === "" || valorContra.length < 4 || valorContra.length > 10) {
            formularioRegistro = false;
            setErrorContra(true);
        }

        const valorRepetir = repetirContra.trim();
        if (valorRepetir === "" || valorRepetir !== valorContra) {
            formularioRegistro = false;
            setErrorRepetirContra(true);
        }

        if (formularioRegistro) {
            setMensajeRegistro("¡Registro exitoso! Ya puedes iniciar sesión.");
            setClaseMensaje("text-success");
        } else {
            setMensajeRegistro("Por favor, completa correctamente todos los campos.");
            setClaseMensaje("text-danger");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <Subtitulo texto="Registro de usuario" clasesExtras="text-center text-primary mb-4"/>
                    
                    <form className="p-4 border rounded shadow-sm bg-light" onSubmit={manejarSubmit} noValidate>
                        
                        <CampoFormulario 
                            id="nombre"
                            textoLabel="Nombre completo"
                            tipo="text"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            error={errorNombre}
                        />

                        <CampoFormulario 
                            id="email"
                            textoLabel="Correo electrónico"
                            tipo="email"
                            placeholder="ejemplo@duocuc.cl"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            error={errorCorreo}
                        />

                        <CampoFormulario 
                            id="password"
                            textoLabel="Contraseña"
                            tipo="password"
                            placeholder="4 a 10 caracteres"
                            value={contra}
                            onChange={(e) => setContra(e.target.value)}
                            error={errorContra}
                        />

                        <CampoFormulario 
                            id="repetirPassword"
                            textoLabel="Confirmar contraseña"
                            tipo="password"
                            placeholder="Repite tu contraseña"
                            value={repetirContra}
                            onChange={(e) => setRepetirContra(e.target.value)}
                            error={errorRepetirContra}
                        />

                        <div className={`mt-3 text-center fw-bold ${claseMensaje}`}>
                            {mensajeRegistro}
                        </div>

                        <div className="d-grid mt-4">
                            <Boton tipoBoton="submit" texto="Registrarse" variante="primary" />
                        </div>

                        <MensajeRegistro 
                            ruta="/login" 
                            textoEnlace=" Iniciar sesión aquí" 
                            textoPregunta="¿Ya tienes una cuenta? "
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrarUsuario;