import { useState, useEffect } from 'react';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Enlace from '../../components/atoms/Enlace';
import Boton from '../../components/atoms/Boton';
import Parrafo from '../../components/atoms/Parrafo';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import ModalConfirmacion from '../../components/molecules/ModalConfirmacion';
import Alerta from '../../components/molecules/Alerta';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import {
  listarCategorias,
  eliminarCategoria,
  contarServiciosPorCategoria,
} from '../../services/categoriaService';

function AdminCategoriaListado() {
  useTituloPagina('Listado de categorías');

  const [categorias, setCategorias] = useState([]);
  const [conteo, setConteo] = useState({});
  const [errorEliminar, setErrorEliminar] = useState('');
  const [modalEliminar, setModalEliminar] = useState({ abierto: false, categoria: null });

  const cargar = () => {
    setCategorias(listarCategorias());
    setConteo(contarServiciosPorCategoria());
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirModalEliminar = (categoria) => {
    setErrorEliminar('');
    setModalEliminar({ abierto: true, categoria });
  };

  const cerrarModal = () => {
    setModalEliminar({ abierto: false, categoria: null });
  };

  const confirmarEliminar = () => {
    if (!modalEliminar.categoria) return;

    try {
      eliminarCategoria(modalEliminar.categoria.id);
      cargar();
      cerrarModal();
      setErrorEliminar('');
    } catch (err) {
      setErrorEliminar(err.message || 'No se pudo eliminar la categoría.');
      cerrarModal();
    }
  };

  return (
    <TemplateAdmin>
      <EncabezadoAdmin
        titulo="Listado de categorías"
        descripcion="Estas son las categorías disponibles para clasificar los servicios del catálogo."
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Enlace
          to="/admin/categorias/nuevo"
          texto="+ Nueva categoría"
          clasesExtras="btn btn-primary text-white"
        />
        <span className="text-muted small">Total: {categorias.length} categorías</span>
      </div>

      {errorEliminar && (
        <Alerta
          variante="warning"
          titulo="No se eliminó."
          texto={errorEliminar}
          clasesExtras="mb-3"
        />
      )}

      {categorias.length === 0 ? (
        <div className="alert alert-light border text-center py-5 rounded-4 shadow-sm">
          <Parrafo clasesExtras="text-muted mb-0">
            No hay categorías registradas. Crea la primera para empezar a clasificar servicios.
          </Parrafo>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-3">Icono</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th className="text-center">Servicios</th>
                  <th className="px-3 text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => {
                  const cantidad = conteo[cat.nombre] || 0;
                  return (
                    <tr key={cat.id}>
                      <td className="px-3 fs-4" aria-hidden="true">
                        {cat.icono || '🐾'}
                      </td>
                      <td className="fw-medium text-dark">{cat.nombre}</td>
                      <td className="text-muted small">
                        {cat.descripcion || '—'}
                      </td>
                      <td className="text-center">
                        <span className="badge bg-light text-secondary border px-2 py-1">
                          {cantidad}
                        </span>
                      </td>
                      <td className="px-3 text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Enlace
                            to={`/admin/categorias/${cat.id}/editar`}
                            texto="Editar"
                            clasesExtras="btn btn-sm btn-outline-primary"
                          />
                          <Boton
                            tipoBoton="button"
                            variante="outline-danger"
                            texto="Eliminar"
                            clasesExtras="btn-sm"
                            onClick={() => abrirModalEliminar(cat)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ModalConfirmacion
        abierto={modalEliminar.abierto}
        titulo="Eliminar categoría"
        mensaje={`¿Estás seguro de que deseas eliminar la categoría "${modalEliminar.categoria?.nombre}"? Solo se podrá eliminar si ningún servicio la está usando.`}
        onConfirmar={confirmarEliminar}
        onCancelar={cerrarModal}
        textoConfirmar="Sí, eliminar"
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </TemplateAdmin>
  );
}

export default AdminCategoriaListado;