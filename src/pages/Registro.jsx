import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TemplateRegistro from '../components/templates/TemplateRegistro';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { registrar } from '../services/authService';
import { obtenerMensajeError } from '../services/apiErrores';
import { registroRequestDto } from '../dto/auth.dto';
import { registrarMascota } from '../services/mascotaService';
import { validarRegistro } from '../utils/validaciones/ValidarLogin_Registro';

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
  const [enviando, setEnviando] = useState(false);

  
  const manejarCambio = (campo) => (e) => {
    setValores({ ...valores, [campo]: e.target.value });
    setErrores({ ...errores, [campo]: '' });
  };

const manejarSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarRegistro(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
        setMensajeRegistro("");
        return;
    }

    setEnviando(true);
    setMensajeRegistro('Creando tu cuenta...');
    setClaseMensaje('text-muted');

    try {
      await registrar(registroRequestDto(valores));

      registrarMascota({
          correoDueno: valores.correo.trim(),
          rutDueno: valores.rut.trim(),
          telefonoDueno: valores.telefono.trim(),
          nombre: valores.nombreMascota.trim(),
          especie: valores.especie,
          raza: valores.raza.trim(),
          sexo: valores.sexo,
          fechaNacimiento: valores.fechaNacimiento,
          comentario: valores.comentario.trim(),
          esterilizada: valores.esterilizada,
      });
      navigate("/login", { state: { registroExitoso: true } });
    } catch (error) {
      if (error.response?.status === 409) {
        setErrores({ ...nuevosErrores, correo: 'Ya existe una cuenta con este correo.' });
      }
      setMensajeRegistro(obtenerMensajeError(error));
      setClaseMensaje('text-danger');
    } finally {
      setEnviando(false);
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
      enviando={enviando}
    />
  );
}

export default Registro;
