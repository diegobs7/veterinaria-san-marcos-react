import { useParams } from 'react-router-dom';
import DetalleServicioTemplate from '../components/templates/DetalleServicioTemplate';
import Enlace from '../components/atoms/Enlace';
import Parrafo from '../components/atoms/Parrafo';
import InfoServicio from '../components/organisms/InfoServicio';
import TarjetaAgendarCita from '../components/organisms/TarjetaAgendarCita';
import formatearPrecio from '../utils/FormatearPrecio';
import { useServicios } from '../context/ServiciosContext';
import ObtenerEspeciesServicio from '../utils/ObtenerEspeciesServicio';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import { obtenerOfertas } from '../utils/ofertas';
import ofertasIniciales from '../data/ofertas.json';

function DetalleServicio() {
    const { id } = useParams();
    const { obtener } = useServicios();
    const servicio = obtener(id);
    useTituloPagina(servicio ? servicio.titulo : 'Servicio no encontrado');

    if (!servicio) {
        return (
            <div className="container py-4">
                <Parrafo clasesExtras="mb-3">Servicio no encontrado.</Parrafo>
                <Enlace to="/servicios" texto="← Volver a Servicios" />
            </div>
        );
    }

    const servicioEnOferta = obtenerOfertas([servicio], ofertasIniciales)[0];
    const precioFinal = servicioEnOferta?.precioOferta ?? servicio.precio;

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
                    etiquetaPrecio={servicioEnOferta ? "Precio en oferta" : "Valor del servicio"}
                    monto={formatearPrecio(precioFinal)}
                    duracion={servicio.duracion}
                    especies={ObtenerEspeciesServicio(servicio.especie)}
                    nombreServicio={servicio.titulo}
                    servicioId={servicio.id}
                    precio={precioFinal}
                />
            }
        />
    );
}

export default DetalleServicio;
