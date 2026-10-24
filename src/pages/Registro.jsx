import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TemplateRegistro from '../components/templates/TemplateRegistro';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { buscarUsuarioPorCorreo, registrarUsuario } from '../services/usuarioService';
import { registrarMascota } from '../services/mascotaService';
import { validarRegistro, validarCorreoDisponible } from '../utils/validaciones/ValidarLogin_Registro';

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

    if (!nuevosErrores.correo) {
        const mensajeCorreo = validarCorreoDisponible(buscarUsuarioPorCorreo(valores.correo));
        if (mensajeCorreo) {
            nuevosErrores.correo = mensajeCorreo;
        }
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
        registrarUsuario({
            nombre: valores.nombreCompleto,
            rut: valores.rut,
            telefono: valores.telefono,
            correo: valores.correo,
            direccion: valores.direccion,
            contra: valores.contra,
        });

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
