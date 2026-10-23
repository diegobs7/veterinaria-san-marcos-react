import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TemplateRegistro from '../components/templates/TemplateRegistro';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import {validarNombre, validarCorreo, validarContra, validarRepetirContra, validarCorreoDisponible} from '../utils/validaciones/ValidarLogin_Registro';
import { buscarUsuarioPorCorreo, registrarUsuario } from '../services/usuarioService';

function Registro() {
  useTituloPagina('Registro')
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [repetirContra, setRepetirContra] = useState('');

  const [mensajeRegistro, setMensajeRegistro] = useState('');
  const [claseMensaje, setClaseMensaje] = useState('');

  const [errores, setErrores] = useState({
    errorNombre: '',
    errorCorreo: '',
    errorContra: '',
    errorRepetirContra: '',
  });

const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      errorNombre: validarNombre(nombre),
      errorCorreo: validarCorreo(correo),
      errorContra: validarContra(contra),
      errorRepetirContra: validarRepetirContra(contra, repetirContra),
    };

    if (nuevosErrores.errorCorreo === '') {
      nuevosErrores.errorCorreo = validarCorreoDisponible(buscarUsuarioPorCorreo(correo));
    }

    setErrores(nuevosErrores);

    const esValido = Object.values(nuevosErrores).every((mensaje) => mensaje === '');

    if (esValido) {
      registrarUsuario({ nombre, correo, contra });
      setMensajeRegistro("¡Registro exitoso!");
      setClaseMensaje("text-success");
      navigate("/login");
    } else {
      setMensajeRegistro("");
    }
};

  return (
    <TemplateRegistro
      nombre={nombre}
      onChangeNombre={(e) => setNombre(e.target.value)}
      errorNombre={errores.errorNombre}

      correo={correo}
      onChangeCorreo={(e) => setCorreo(e.target.value)}
      errorCorreo={errores.errorCorreo}

      contra={contra}
      onChangeContra={(e) => setContra(e.target.value)}
      errorContra={errores.errorContra}

      repetirContra={repetirContra}
      onChangeRepetirContra={(e) => setRepetirContra(e.target.value)}
      errorRepetirContra={errores.errorRepetirContra}

      mensajeRegistro={mensajeRegistro}
      claseMensaje={claseMensaje}
      manejarSubmit={manejarSubmit}
    />
  );
}

export default Registro;