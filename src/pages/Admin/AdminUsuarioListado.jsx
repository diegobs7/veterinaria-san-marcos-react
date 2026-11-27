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
  desactivarUsuario,
  reactivarUsuario,
  eliminarUsuario,
} from '../../services/usuarioService';
import { obtenerSesion } from '../../utils/sesionAdmin';

// Textos del modal según la acción: desactivar (reversible) o eliminar (permanente)
const TEXTOS_MODAL = {
  desactivar: {
    titulo: 'Desactivar cuenta de usuario',
    pregunta: '¿Deseas desactivar a',
    aviso: 'Ya no podrá iniciar sesión, pero puedes reactivarla después.',
    confirmar: 'Sí, desactivar cuenta',
  },
  eliminar: {
    titulo: 'Eliminar cuenta de usuario',
    pregunta: '¿Deseas eliminar permanentemente a',
    aviso: 'Esta acción no se puede deshacer.',
    confirmar: 'Sí, eliminar cuenta',
  },
};

function AdminUsuarioListado() {
  useTituloPagina('Listado de usuarios');

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ abierto: false, usuario: null, accion: 'desactivar' });

  const sesionActual = obtenerSesion();

  const cargarUsuarios = async () => {
    setCargando(true);
    setError('');
    try {
      const lista = await listarUsuarios();
      setUsuarios(lista);
    } catch {
      setError('No se pudieron cargar los usuarios. Revisa tu conexión e intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirModal = (usuario, accion) => {
    setModal({ abierto: true, usuario, accion });
  };

  const cerrarModal = () => {
    setModal({ abierto: false, usuario: null, accion: 'desactivar' });
  };

  const confirmarAccion = async () => {
    if (!modal.usuario) return;
    try {
      if (modal.accion === 'eliminar') {
        await eliminarUsuario(modal.usuario.id);
      } else {
        await desactivarUsuario(modal.usuario.id);
      }
      cerrarModal();
      cargarUsuarios();
    } catch (error) {
      cerrarModal();
      setError(error.message);
    }
  };

  // Reactivar no necesita confirmación: no se pierde nada
  const reactivar = async (usuario) => {
    try {
      await reactivarUsuario(usuario.id);
      cargarUsuarios();
    } catch (error) {
      setError(error.message);
    }
  };

  const textos = TEXTOS_MODAL[modal.accion];

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

      {cargando ? (
        <Parrafo clasesExtras="text-muted text-center py-5">Cargando usuarios...</Parrafo>
      ) : error ? (
        <div className="alert alert-danger text-center py-4 rounded-4">
          <Parrafo clasesExtras="mb-3">{error}</Parrafo>
          <Boton tipoBoton="button" variante="outline-danger" texto="Reintentar" onClick={cargarUsuarios} />
        </div>
      ) : usuarios.length === 0 ? (
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
                  const esAdministrador = rol === 'Administrador';
                  const esMiSesion = sesionActual?.id === u.id;
                  const esProtegido = esAdministrador || esMiSesion;

                  return (
                    <tr key={u.id}>
                      <td className="px-3 fw-medium text-dark">
                        {nombreCompleto(u) || 'Sin nombre'}
                        {!u.activo && <span className="badge bg-secondary ms-2">Inactivo</span>}
                      </td>
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

                          {esProtegido ? (
                            <span
                              className="badge bg-light text-muted border px-2 py-1 align-self-center"
                              title="No es posible desactivar ni eliminar a un Administrador ni tu propia cuenta"
                            >
                              Protegido
                            </span>
                          ) : u.activo ? (
                            <Boton
                              tipoBoton="button"
                              variante="outline-danger"
                              texto="Desactivar"
                              onClick={() => abrirModal(u, 'desactivar')}
                              clasesExtras="btn-sm"
                            />
                          ) : (
                            // Solo una cuenta ya desactivada se puede eliminar (dos pasos para no borrar por error)
                            <>
                              <Boton
                                tipoBoton="button"
                                variante="outline-success"
                                texto="Reactivar"
                                onClick={() => reactivar(u)}
                                clasesExtras="btn-sm"
                              />
                              <Boton
                                tipoBoton="button"
                                variante="danger"
                                texto="Eliminar"
                                onClick={() => abrirModal(u, 'eliminar')}
                                clasesExtras="btn-sm"
                              />
                            </>
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

      <ModalConfirmacion
        abierto={modal.abierto}
        titulo={textos.titulo}
        mensaje={`${textos.pregunta} "${nombreCompleto(modal.usuario)} (${modal.usuario?.correo})"? ${textos.aviso}`}
        onConfirmar={confirmarAccion}
        onCancelar={cerrarModal}
        textoConfirmar={textos.confirmar}
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </TemplateAdmin>
  );
}

export default AdminUsuarioListado;