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
  buscarUsuarioPorId,
  nombreCompleto,
  registrarUsuario,
  tipoDeUsuario,
} from '../../services/usuarioService';
import validarUsuario from '../../utils/validaciones/ValidarUsuario';

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

  useTituloPagina(esEdicion ? 'Editar usuario' : 'Nuevo usuario');

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  // Al editar, carga el usuario (con el backend la respuesta tarda); al crear, limpia el formulario
  useEffect(() => {
    const cargarUsuario = async () => {
      setErrores({});
      setMensaje('');

      if (!id) {
        setUsuario(null);
        setValores(VALORES_INICIALES);
        setCargando(false);
        return;
      }

      setCargando(true);
      try {
        const encontrado = await buscarUsuarioPorId(id);
        setUsuario(encontrado);
        if (encontrado) setValores(aValores(encontrado));
      } catch {
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, [id]);

  if (cargando) {
    return (
      <TemplateAdmin>
        <Parrafo clasesExtras="text-muted text-center py-5">Cargando usuario...</Parrafo>
      </TemplateAdmin>
    );
  }

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

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (guardando) return;

    const nuevosErrores = validarUsuario(valores, esEdicion);
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

    setGuardando(true);
    try {
      if (esEdicion) {
        await actualizarUsuario(usuario.id, datos);
        setMensaje('Los cambios se guardaron correctamente.');
      } else {
        await registrarUsuario({ ...datos, contra: valores.contra });
        setValores(VALORES_INICIALES);
        setMensaje('El usuario se guardó correctamente.');
      }
      setTimeout(() => navigate('/admin/usuarios/listado'), 1200);
    } catch (error) {
      // El correo repetido (o cualquier error del servicio) se muestra en el formulario
      setErrores({ [error.campo || 'correo']: error.message });
      setMensaje('');
    } finally {
      setGuardando(false);
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
        textoBoton={guardando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Guardar usuario'}
        manejarSubmit={manejarSubmit}
      />
    </TemplateAdmin>
  );
}

export default AdminUsuarioForm;