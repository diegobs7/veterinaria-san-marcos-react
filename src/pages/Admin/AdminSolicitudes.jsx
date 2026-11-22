import { useState, useEffect } from 'react';
import TemplateAdmin from '../../components/templates/TemplateAdmin';
import Subtitulo from '../../components/atoms/Subtitulo';
import Parrafo from '../../components/atoms/Parrafo';
import Boton from '../../components/atoms/Boton';
import ModalConfirmacion from '../../components/molecules/ModalConfirmacion';
import TablaSolicitudesAdmin from '../../components/molecules/TablaSolicitudesAdmin';
import { useTituloPagina } from '../../Hooks/useTituloPagina';

function AdminSolicitudes() {
  useTituloPagina('Gestión de Solicitudes');

  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState('todas');


  const [modal, setModal] = useState({
    abierto: false,
    id: null,
    tipo: null, 
    titulo: '',
    mensaje: '',
    textoBoton: '',
  });

  const cargarCitas = () => {
    try {
      const data = JSON.parse(localStorage.getItem('solicitudes')) || [];
      setSolicitudes(data);
    } catch {
      setSolicitudes([]);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const actualizarEstado = (idCita, nuevoEstado) => {
    try {
      const actuales = JSON.parse(localStorage.getItem('solicitudes')) || [];
      const actualizadas = actuales.map((c) =>
        c.id === idCita ? { ...c, estado: nuevoEstado } : c
      );
      localStorage.setItem('solicitudes', JSON.stringify(actualizadas));
      setSolicitudes(actualizadas);
    } catch (e) {
      console.error(e);
    }
  };


  const eliminarSolicitud = (idCita) => {
    try {
      const actuales = JSON.parse(localStorage.getItem('solicitudes')) || [];
      const actualizadas = actuales.filter((c) => c.id !== idCita);
      localStorage.setItem('solicitudes', JSON.stringify(actualizadas));
      setSolicitudes(actualizadas);
    } catch (e) {
      console.error(e);
    }
  };

  const manejarConfirmar = (id) => {
    actualizarEstado(id, 'Confirmada');
  };

  const abrirModalCancelar = (id) => {
    setModal({
      abierto: true,
      id,
      tipo: 'cancelar',
      titulo: 'Cancelar Cita Médica',
      mensaje: '¿Estás seguro de que deseas cancelar esta solicitud? El cliente verá el estado como "Cancelada".',
      textoBoton: 'Sí, cancelar cita',
    });
  };

  const abrirModalEliminar = (id) => {
    setModal({
      abierto: true,
      id,
      tipo: 'eliminar',
      titulo: 'Eliminar Registro Definitivamente',
      mensaje: 'Esta acción borrará la solicitud por completo del sistema y no se podrá recuperar. ¿Deseas continuar?',
      textoBoton: 'Sí, eliminar',
    });
  };

  const cerrarModal = () => {
    setModal({ abierto: false, id: null, tipo: null, titulo: '', mensaje: '', textoBoton: '' });
  };

  const ejecutarAccionModal = () => {
    if (modal.tipo === 'cancelar') {
      actualizarEstado(modal.id, 'Cancelada');
    } else if (modal.tipo === 'eliminar') {
      eliminarSolicitud(modal.id);
    }
    cerrarModal();
  };

  // Filtrado
  const solicitudesFiltradas = solicitudes.filter((cita) => {
    if (filtro === 'todas') return true;
    return (cita.estado || 'Pendiente').toLowerCase() === filtro.toLowerCase();
  });

  const conteos = {
    todas: solicitudes.length,
    pendientes: solicitudes.filter((c) => (c.estado || 'Pendiente').toLowerCase() === 'pendiente').length,
    confirmadas: solicitudes.filter((c) => (c.estado || '').toLowerCase() === 'confirmada').length,
    canceladas: solicitudes.filter((c) => (c.estado || '').toLowerCase() === 'cancelada').length,
  };

  return (
    <TemplateAdmin>
      <div className="mb-4">
        <Subtitulo nivel="h2" texto="Gestión de Citas" clasesExtras="h4 fw-bold text-dark mb-1" />
        <Parrafo clasesExtras="text-muted">
          Revisa las citas agendadas, confírmalas, cancélalas o elimina registros obsoletos.
        </Parrafo>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <Boton
          tipoBoton="button"
          variante={filtro === 'todas' ? 'primary text-white' : 'outline-secondary'}
          texto={`Todas (${conteos.todas})`}
          onClick={() => setFiltro('todas')}
          clasesExtras="btn-sm"
        />
        <Boton
          tipoBoton="button"
          variante={filtro === 'pendiente' ? 'warning text-dark' : 'outline-warning text-dark'}
          texto={`Pendientes (${conteos.pendientes})`}
          onClick={() => setFiltro('pendiente')}
          clasesExtras="btn-sm"
        />
        <Boton
          tipoBoton="button"
          variante={filtro === 'confirmada' ? 'success text-white' : 'outline-success'}
          texto={`Confirmadas (${conteos.confirmadas})`}
          onClick={() => setFiltro('confirmada')}
          clasesExtras="btn-sm"
        />
        <Boton
          tipoBoton="button"
          variante={filtro === 'cancelada' ? 'danger text-white' : 'outline-danger'}
          texto={`Canceladas (${conteos.canceladas})`}
          onClick={() => setFiltro('cancelada')}
          clasesExtras="btn-sm"
        />
      </div>

      <TablaSolicitudesAdmin
        solicitudes={solicitudesFiltradas}
        onConfirmar={manejarConfirmar}
        onSolicitarCancelacion={abrirModalCancelar}
        onEliminar={abrirModalEliminar}
      />

      <ModalConfirmacion
        abierto={modal.abierto}
        titulo={modal.titulo}
        mensaje={modal.mensaje}
        onConfirmar={ejecutarAccionModal}
        onCancelar={cerrarModal}
        textoConfirmar={modal.textoBoton}
        textoCancelar="Volver"
        varianteConfirmar="danger"
      />
    </TemplateAdmin>
  );
}

export default AdminSolicitudes;