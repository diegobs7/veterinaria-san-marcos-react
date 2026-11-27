import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Enlace from '../../components/atoms/Enlace';
import Parrafo from '../../components/atoms/Parrafo';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import EstadoCatalogo from '../../components/molecules/EstadoCatalogo';
import FormularioCategoria from '../../components/organisms/FormularioCategoria';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import { useCategorias } from '../../Hooks/useCategorias';
import { useServicios } from '../../Hooks/useServicios';

import validarCategoria from '../../utils/validaciones/ValidarCateogria';

const VALORES_INICIALES = {
  nombre: '',
  icono: '',
  descripcion: '',
};

function aValores(categoria) {
  return {
    nombre: categoria.nombre ?? '',
    icono: categoria.icono ?? '',
    descripcion: categoria.descripcion ?? '',
  };
}

function AdminCategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtener, crear, actualizar, cargando, error } = useCategorias();
  const { recargar: recargarServicios } = useServicios();
  const esEdicion = Boolean(id);
  const categoria = esEdicion ? obtener(id) : null;

  useTituloPagina(esEdicion ? 'Editar categoría' : 'Nueva categoría');

  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [cargadoDe, setCargadoDe] = useState(null);

  // Llena el formulario cuando la categoría llega del backend o cambia la ruta
  const clave = id ?? 'nueva';
  if (cargadoDe !== clave && (!esEdicion || categoria)) {
    setCargadoDe(clave);
    setValores(categoria ? aValores(categoria) : VALORES_INICIALES);
    setErrores({});
    setMensaje('');
  }

  if (cargando || error) {
    return (
      <TemplateAdmin>
        <EstadoCatalogo cargando={cargando} error={error} />
      </TemplateAdmin>
    );
  }

  if (esEdicion && !categoria) {
    return (
      <TemplateAdmin>
        <Parrafo clasesExtras="mb-3">Categoría no encontrada.</Parrafo>
        <Enlace to="/admin/categorias/listado" texto="← Volver al listado" />
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

    const nuevosErrores = validarCategoria(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje('');
      return;
    }

    const datos = {
      nombre: valores.nombre.trim(),
      icono: valores.icono.trim() || '🐾',
      descripcion: valores.descripcion.trim(),
    };

    try {
      if (esEdicion) {
        await actualizar(categoria.id, datos);
        await recargarServicios(); // los servicios muestran el nombre nuevo de su categoría
        setMensaje('Los cambios se guardaron correctamente.');
      } else {
        await crear(datos);
        setValores(VALORES_INICIALES);
        setMensaje('La categoría se creó correctamente.');
      }

      setTimeout(() => {
        navigate('/admin/categorias/listado');
      }, 1200);
    } catch (err) {
      // Por ejemplo el 409 "Ya existe una categoría con ese nombre"
      setErrores({ nombre: err.message || 'No se pudo guardar la categoría.' });
      setMensaje('');
    }
  };

  return (
    <TemplateAdmin>
      <EncabezadoAdmin
        titulo={esEdicion ? 'Editar categoría' : 'Nueva categoría'}
        descripcion={
          esEdicion
            ? 'Modifica los datos de la categoría seleccionada.'
            : 'Completa el formulario para agregar una categoría al catálogo.'
        }
      />
      <FormularioCategoria
        valores={valores}
        errores={errores}
        onCambio={manejarCambio}
        manejarSubmit={manejarSubmit}
        mensaje={mensaje}
        textoBoton={esEdicion ? 'Guardar cambios' : 'Crear categoría'}
        esEdicion={esEdicion}
      />
    </TemplateAdmin>
  );
}

export default AdminCategoriaForm;