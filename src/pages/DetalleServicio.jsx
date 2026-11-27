import { useParams } from 'react-router-dom';
import DetalleServicioTemplate from '../components/templates/DetalleServicioTemplate';
import Enlace from '../components/atoms/Enlace';
import Parrafo from '../components/atoms/Parrafo';
import InfoServicio from '../components/organisms/InfoServicio';
import TarjetaAgendarCita from '../components/organisms/TarjetaAgendarCita';
import formatearPrecio from '../utils/FormatearPrecio';
import { useServicios } from '../Hooks/useServicios';
import ObtenerEspeciesServicio from '../utils/ObtenerEspeciesServicio';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import EstadoCatalogo from '../components/molecules/EstadoCatalogo';
import { estaEnOferta, precioFinal } from '../utils/ofertas';

function DetalleServicio() {
    const { id } = useParams();
    const { obtener, cargando, error } = useServicios();
    const servicio = obtener(id);
    useTituloPagina(servicio ? servicio.titulo : 'Servicio');

    if (cargando || error) {
        return (
            <div className="container py-4">
                <EstadoCatalogo cargando={cargando} error={error} />
            </div>
        );
    }

    if (!servicio) {
        return (
            <div className="container py-4">
                <Parrafo clasesExtras="mb-3">Servicio no encontrado.</Parrafo>
                <Enlace to="/servicios" texto="← Volver a Servicios" />
            </div>
        );
    }

    const enOferta = estaEnOferta(servicio);
    const precio = precioFinal(servicio);

    return (
        <DetalleServicioTemplate
            navegacion={<Enlace to="/servicios" texto="← Volver a Servicios" />}
            contenido={
                <InfoServicio
                    especie={servicio.especie}
                    titulo={servicio.titulo}
                    duracion={servicio.duracion}
                    modalidad={servicio.modalidad || "Presencial"}
                    descripcion={servicio.descripcion}
                    incluye={servicio.incluye}
                    advertencia={servicio.observaciones}
                />
            }
            lateral={
                <TarjetaAgendarCita
                    key={servicio.id}
                    etiquetaPrecio={enOferta ? "Precio en oferta" : "Valor del servicio"}
                    monto={formatearPrecio(precio)}
                    duracion={servicio.duracion}
                    especies={ObtenerEspeciesServicio(servicio.especie)}
                    nombreServicio={servicio.titulo}
                    servicioId={servicio.id}
                    precio={precio}
                />
            }
        />
    );
}

export default DetalleServicio;
