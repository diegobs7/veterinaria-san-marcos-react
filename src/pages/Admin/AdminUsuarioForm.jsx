import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Enlace from '../../components/atoms/Enlace';
import Parrafo from '../../components/atoms/Parrafo';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import FormularioUsuario from '../../components/organisms/FormularioUsuario';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import {
  actualizarUsuario,
  buscarUsuarioPorCorreo,
  buscarUsuarioPorId,
  nombreCompleto,
  registrarUsuario,
  tipoDeUsuario,
} from '../../services/usuarioService';
import validarUsuario from '../../utils/validaciones/ValidarUsuario';
import { validarCorreoDisponible } from '../../utils/validaciones/ValidarLogin_Registro';

const VALORES_INICIALES = {
  rut: '',
  nombre: '',
  apellidos: '',
  correo: '',
  telefono: '',
  fechaNacimiento: '',
  tipo: '',
  region: '',
  direccion: '',
  contra: '',
};

function aValores(usuario) {
  return {
    rut: usuario.rut ?? '',
    nombre: usuario.nombre ?? '',
    apellidos: usuario.apellidos ?? '',
    correo: usuario.correo ?? '',
    telefono: usuario.telefono ?? '',
    fechaNacimiento: usuario.fechaNacimiento ?? '',
    tipo: tipoDeUsuario(usuario),
    region: usuario.region ?? '',
    direccion: usuario.direccion ?? '',
    contra: '',
  };
}

function AdminUsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);
  const usuario = esEdicion ? buscarUsuarioPorId(id) : null;

  useTituloPagina(esEdicion ? 'Editar usuario' : 'Nuevo usuario');

  const [valores, setValores] = useState(usuario ? aValores(usuario) : VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  // Sincroniza y limpia los campos al alternar entre /nuevo y /:id/editar
  useEffect(() => {
    if (id) {
      const usuarioEncontrado = buscarUsuarioPorId(id);
      if (usuarioEncontrado) {
        setValores(aValores(usuarioEncontrado));
      }
    } else {
      setValores(VALORES_INICIALES);
    }
    setErrores({});
    setMensaje('');
  }, [id]);

  if (id && !usuario) {
    return (
      <TemplateAdmin>
        <Parrafo clasesExtras="mb-3">Usuario no encontrado.</Parrafo>
        <Enlace to="/admin/usuarios/listado" texto="← Volver al listado" />
      </TemplateAdmin>
    );
  }

  const manejarCambio = (campo) => (e) => {
    setValores({ ...valores, [campo]: e.target.value });
    setErrores({ ...errores, [campo]: '' });
    setMensaje('');
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validarUsuario(valores, esEdicion);

    if (!esEdicion && !nuevosErrores.correo) {
      const usuarioExistente = buscarUsuarioPorCorreo(valores.correo);
      const mensajeCorreo = validarCorreoDisponible(usuarioExistente);
      if (mensajeCorreo) {
        nuevosErrores.correo = mensajeCorreo;
      }
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje('');
      return;
    }

    const datos = {
      rut: valores.rut.trim(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      telefono: valores.telefono.trim(),
      correo: valores.correo.trim(),
      fechaNacimiento: valores.fechaNacimiento,
      tipo: valores.tipo,
      region: valores.region,
      direccion: valores.direccion.trim(),
    };

    try {
      if (esEdicion && usuario) {
        // Actualizamos usando el ID como identificador principal
        actualizarUsuario(usuario.id, datos);
        setMensaje('Los cambios se guardaron correctamente.');
        setTimeout(() => navigate('/admin/usuarios/listado'), 1200);
      } else {
        registrarUsuario({
          ...datos,
          contra: valores.contra,
        });
        setValores(VALORES_INICIALES);
        setMensaje('El usuario se guardó correctamente.');
        setTimeout(() => navigate('/admin/usuarios/listado'), 1200);
      }
    } catch (error) {
      // Captura excepciones del servicio (como correo duplicado) y las refleja en el formulario
      setErrores({ correo: error.message });
      setMensaje('');
    }
  };

  return (
    <TemplateAdmin>
      <EncabezadoAdmin
        titulo={esEdicion ? 'Editar usuario' : 'Nuevo usuario'}
        descripcion={
          esEdicion && usuario ? (
            <>
              Editando a: <strong>{nombreCompleto(usuario)}</strong>
            </>
          ) : (
            'Ingresa los datos para registrar un nuevo usuario en la plataforma.'
          )
        }
      />
      <FormularioUsuario
        esEdicion={esEdicion}
        valores={valores}
        errores={errores}
        onCambio={manejarCambio}
        mensaje={mensaje}
        textoBoton={esEdicion ? 'Guardar cambios' : 'Guardar usuario'}
        manejarSubmit={manejarSubmit}
      />
    </TemplateAdmin>
  );
}

export default AdminUsuarioForm;