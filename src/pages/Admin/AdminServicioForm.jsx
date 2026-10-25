import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Enlace from '../../components/atoms/Enlace';
import Parrafo from '../../components/atoms/Parrafo';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import FormularioServicio from '../../components/organisms/FormularioServicio';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import { obtenerServicio, crearServicio, actualizarServicio } from '../../services/servicioService';
import validarServicio from '../../utils/validaciones/ValidarServicio';

const VALORES_INICIALES = {
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
  especie: '',
  duracion: '',
};

const texto = (valor) => (valor ?? '').toString();

function aValores(servicio) {
  return {
    nombre: servicio.titulo ?? '',
    descripcion: texto(servicio.descripcion),
    precio: texto(servicio.precio),
    categoria: servicio.categoria ?? '',
    especie: texto(servicio.especie),
    duracion: texto(servicio.duracion),
  };
}

function AdminServicioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);
  const servicio = esEdicion ? obtenerServicio(id) : null;

  useTituloPagina(esEdicion ? 'Editar servicio' : 'Nuevo servicio');

  const [valores, setValores] = useState(servicio ? aValores(servicio) : VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (id) {
      const encontrado = obtenerServicio(id);
      if (encontrado) setValores(aValores(encontrado));
    } else {
      setValores(VALORES_INICIALES);
    }
    setErrores({});
    setMensaje('');
  }, [id]);

  if (id && !servicio) {
    return (
      <TemplateAdmin>
        <Parrafo clasesExtras="mb-3">Servicio no encontrado.</Parrafo>
        <Enlace to="/admin/servicios/listado" texto="← Volver al listado" />
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

    const nuevosErrores = validarServicio(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje('');
      return;
    }

    const datos = {
      titulo: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      categoria: valores.categoria,
      especie: valores.especie,
      duracion: valores.duracion.trim(),
      precio: Number(valores.precio),
    };

    try {
      if (esEdicion && servicio) {
        actualizarServicio(servicio.id, datos);
        setMensaje('Los cambios se guardaron correctamente.');
      } else {
        crearServicio(datos);
        setValores(VALORES_INICIALES);
        setMensaje('El servicio se guardó correctamente.');
      }

      setTimeout(() => {
        navigate('/admin/servicios/listado');
      }, 1200);
    } catch (error) {
      setErrores({ nombre: error.message || 'Ocurrió un error al guardar el servicio.' });
      setMensaje('');
    }
  };

  return (
    <TemplateAdmin>
      <EncabezadoAdmin
        titulo={esEdicion ? 'Editar servicio' : 'Nuevo servicio'}
        descripcion={
          esEdicion && servicio ? (
            <>
              Editando: <strong>{servicio.titulo}</strong> (código {servicio.codigo})
            </>
          ) : (
            'Completa la información para agregar un nuevo servicio a la clínica.'
          )
        }
      />
      <FormularioServicio
        codigo={servicio?.codigo}
        esEdicion={esEdicion}
        valores={valores}
        errores={errores}
        onCambio={manejarCambio}
        mensaje={mensaje}
        textoBoton={esEdicion ? 'Guardar cambios' : 'Guardar servicio'}
        manejarSubmit={manejarSubmit}
      />
    </TemplateAdmin>
  );
}

export default AdminServicioForm;