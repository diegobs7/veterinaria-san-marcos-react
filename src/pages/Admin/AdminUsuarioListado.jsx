import { useState, useEffect } from 'react';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Enlace from '../../components/atoms/Enlace';
import Boton from '../../components/atoms/Boton';
import Parrafo from '../../components/atoms/Parrafo';
import EncabezadoAdmin from '../../components/molecules/EncabezadoAdmin';
import ModalConfirmacion from '../../components/molecules/ModalConfirmacion';
import { useTituloPagina } from '../../Hooks/useTituloPagina';
import {
  listarUsuarios,
  nombreCompleto,
  tipoDeUsuario,
  eliminarUsuario,
} from '../../services/usuarioService';
import { obtenerSesion } from '../../utils/sesionAdmin';

function AdminUsuarioListado() {
  useTituloPagina('Listado de usuarios');

  const [usuarios, setUsuarios] = useState([]);
  const [modalEliminar, setModalEliminar] = useState({ abierto: false, usuario: null });

  // Obtenemos la sesión actual para no permitir que el admin se borre a sí mismo
  const sesionActual = obtenerSesion();

  const cargarUsuarios = () => {
    setUsuarios(listarUsuarios());
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirModalEliminar = (usuario) => {
    setModalEliminar({ abierto: true, usuario });
  };

  const cerrarModal = () => {
    setModalEliminar({ abierto: false, usuario: null });
  };

  const confirmarEliminar = () => {
    if (modalEliminar.usuario) {
      eliminarUsuario(modalEliminar.usuario.id);
      cargarUsuarios();
      cerrarModal();
    }
  };

  return (
    <TemplateAdmin>
      <EncabezadoAdmin
        titulo="Listado de usuarios"
        descripcion="Estas son las cuentas registradas actualmente en el sitio."
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Enlace
          to="/admin/usuarios/nuevo"
          texto="+ Nuevo usuario"
          clasesExtras="btn btn-primary text-white"
        />
        <span className="text-muted small">Total: {usuarios.length} cuentas</span>
      </div>

      {usuarios.length === 0 ? (
        <div className="alert alert-light border text-center py-5 rounded-4 shadow-sm">
          <Parrafo clasesExtras="text-muted">No hay usuarios registrados en el sistema.</Parrafo>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-3">Nombre</th>
                  <th className="py-3">Correo</th>
                  <th className="py-3">Rol / Tipo</th>
                  <th className="py-3">Región</th>
                  <th className="py-3 px-3 text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => {
                  const rol = tipoDeUsuario(u);
                  const esAdminPrincipal = u.correo?.toLowerCase() === 'admin@duocuc.cl';
                  const esMiSesion = sesionActual?.correo?.toLowerCase() === u.correo?.toLowerCase();
                  const noSePuedeEliminar = esAdminPrincipal || esMiSesion;

                  return (
                    <tr key={u.id}>
                      <td className="px-3 fw-medium text-dark">{nombreCompleto(u) || 'Sin nombre'}</td>
                      <td>{u.correo}</td>
                      <td>
                        <span
                          className={`badge ${
                            rol === 'Administrador'
                              ? 'bg-primary text-white'
                              : 'bg-light text-secondary border'
                          } px-2 py-1`}
                        >
                          {rol}
                        </span>
                      </td>
                      <td>{u.region || 'No registrada'}</td>
                      <td className="px-3 text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Enlace
                            to={`/admin/usuarios/${u.id}/editar`}
                            texto="Editar"
                            clasesExtras="btn btn-sm btn-outline-primary"
                          />

                          <Enlace
                              to={`/admin/usuarios/${u.id}/historial`}
                              texto="Historial"
                              clasesExtras="btn btn-sm btn-outline-secondary"
                          />

                          {!noSePuedeEliminar ? (
                            <Boton
                              tipoBoton="button"
                              variante="outline-danger"
                              texto="Eliminar"
                              onClick={() => abrirModalEliminar(u)}
                              clasesExtras="btn-sm"
                            />
                          ) : (
                            <span
                              className="badge bg-light text-muted border px-2 py-1 align-self-center"
                              title="No es posible eliminar el administrador principal ni tu cuenta activa"
                            >
                              Protegido
                            </span>
                          )}
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

      {/* Modal de confirmación para eliminar */}
      <ModalConfirmacion
        abierto={modalEliminar.abierto}
        titulo="Eliminar cuenta de usuario"
        mensaje={`¿Estás seguro de que deseas eliminar permanentemente a "${nombreCompleto(modalEliminar.usuario)} (${modalEliminar.usuario?.correo})"? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminar}
        onCancelar={cerrarModal}
        textoConfirmar="Sí, eliminar cuenta"
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </TemplateAdmin>
  );
}

export default AdminUsuarioListado;