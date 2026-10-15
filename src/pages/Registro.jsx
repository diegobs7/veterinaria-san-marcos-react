import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateRegistro from '../components/templates/TemplateRegistro';
import { validarFormularioRegistro } from '../utils/validaciones';

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [repetirContra, setRepetirContra] = useState('');

  const [mensajeRegistro, setMensajeRegistro] = useState('');
  const [claseMensaje, setClaseMensaje] = useState('');

  
  const [errores, setErrores] = useState({
    errorNombre: false,
    errorCorreo: false,
    errorContra: false,
    errorRepetirContra: false,
  });

  const manejarSubmit = (e) => {
    e.preventDefault();

   
    const { esValido, errores: nuevosErrores } = validarFormularioRegistro({
      nombre,
      correo,
      contra,
      repetirContra,
    });

    setErrores(nuevosErrores);

    if (esValido) {
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