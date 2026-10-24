import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TemplateRegistro from '../components/templates/TemplateRegistro';
import  {validarRegistro} from '../utils/validaciones/ValidarLogin_Registro';
import { useTituloPagina } from '../Hooks/useTituloPagina';

const VALORES_INICIALES = {
  nombreMascota: '',
  especie: '',
  raza: '',
  sexo: '',
  fechaNacimiento: '',
  comentario: '',
  esterilizada: 'no',
  nombreCompleto: '',
  rut: '',
  telefono: '',
  correo: '',
  direccion: '',
  contra: '',
};

function Registro() {
  useTituloPagina('Registro')
  const navigate = useNavigate();

  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [mensajeRegistro, setMensajeRegistro] = useState('');
  const [claseMensaje, setClaseMensaje] = useState('');

  
  const manejarCambio = (campo) => (e) => {
    setValores({ ...valores, [campo]: e.target.value });
    setErrores({ ...errores, [campo]: '' });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validarRegistro(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setMensajeRegistro("¡Registro exitoso!");
      setClaseMensaje("text-success");
      navigate("/login");
    } else {
      setMensajeRegistro("");
    }
  };

  return (
    <TemplateRegistro
      valores={valores}
      errores={errores}
      onCambio={manejarCambio}
      mensajeRegistro={mensajeRegistro}
      claseMensaje={claseMensaje}
      manejarSubmit={manejarSubmit}
    />
  );
}

export default Registro;
