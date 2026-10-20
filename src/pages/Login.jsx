import { useState } from "react";
import TemplateLogin from "../components/templates/TemplateLogin";
import { useNavigate } from "react-router-dom";
import { useTituloPagina } from "../Hooks/useTituloPagina";
import ValidarLogin from "../utils/ValidarLogin";

function Login() {
    useTituloPagina("Iniciar sesion");
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");
    const [mensajeLogin, setMensajeLogin] = useState("");
    const [claseMensaje, setClaseMensaje] = useState("");

    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorContra, setErrorContra] = useState("");

const manejarSubmit = (e) => {
    e.preventDefault();

    const errores = ValidarLogin({ correo, contra });

    setErrorCorreo(errores.correo || "");
    setErrorContra(errores.contra || "");

    if (Object.keys(errores).length === 0) {
        setMensajeLogin("Verificacion exitosa...");
        setClaseMensaje("text-success");
        navigate("/");
    } else {
        setMensajeLogin("");
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
        />
    );
    }

export default Login;
