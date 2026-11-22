import { useState } from "react";
import TemplateLogin from "../components/templates/TemplateLogin";
import { useNavigate, useLocation } from "react-router-dom";
import { useTituloPagina } from "../Hooks/useTituloPagina";
import { iniciarSesion } from "../utils/sesionAdmin";
import validarLogin from "../utils/validaciones/ValidarLogin_Registro";
import { login, obtenerPerfil } from "../services/authService";
import { obtenerMensajeError } from "../services/apiErrores";
import { loginRequestDto } from "../dto/auth.dto";

function Login() {
    useTituloPagina("Iniciar sesion");
    const navigate = useNavigate();

    const location = useLocation();
    const vieneDeRegistro = location.state?.registroExitoso;

    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");
    const [mensajeLogin, setMensajeLogin] = useState(vieneDeRegistro ? "¡Te registraste con éxito! Ya puedes iniciar sesión." : "");
    const [claseMensaje, setClaseMensaje] = useState(vieneDeRegistro ? "text-success" : "");

    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorContra, setErrorContra] = useState("");
    const [enviando, setEnviando] = useState(false);

const manejarSubmit = async (e) => {
    e.preventDefault();

    const errores = validarLogin({ correo, contra });

    setErrorCorreo(errores.correo || "");
    setErrorContra(errores.contra || "");

    if (Object.keys(errores).length > 0) {
        setMensajeLogin("");
        return;
    }

    setEnviando(true);
    setMensajeLogin("Verificando tus datos...");
    setClaseMensaje("text-muted");

    try {
        const token = await login(loginRequestDto({ correo, contra }));
        const perfil = await obtenerPerfil(token.accessToken);
        const sesion = iniciarSesion(token, perfil);
        setMensajeLogin("Verificación exitosa...");
        setClaseMensaje("text-success");
        navigate(sesion.rol === "Administrador" ? "/admin" : "/");
    } catch (error) {
        setMensajeLogin(obtenerMensajeError(error));
        setClaseMensaje("text-danger");
    } finally {
        setEnviando(false);
    }
};

    return (
        <TemplateLogin
        correo={correo}
        onChangeCorreo={(e) => setCorreo(e.target.value)}
        errorCorreo={errorCorreo}
        contra={contra}
        onChangeContra={(e) => setContra(e.target.value)}
        errorContra={errorContra}
        mensajeLogin={mensajeLogin}
        claseMensaje={claseMensaje}
        manejarSubmit={manejarSubmit}
        enviando={enviando}
        />
    );
    }

export default Login;
