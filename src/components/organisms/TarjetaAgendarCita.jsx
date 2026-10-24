import Parrafo from '../atoms/Parrafo';
import PrecioDestacado from '../molecules/PrecioDestacado';
import FormularioReserva from './FormularioReserva';

function TarjetaAgendarCita(props) {
    return (
        <aside className={`card shadow-sm ${props.clasesExtras || ''}`}>
            <div className="card-body">
                <PrecioDestacado etiqueta={props.etiquetaPrecio} monto={props.monto} />
                <Parrafo clasesExtras="text-muted mb-4">
                    ⏱ Duración aprox. {props.duracion}
                </Parrafo>

                <FormularioReserva especies={props.especies} nombreServicio={props.nombreServicio} />
            </div>
        </aside>
    );
}

export default TarjetaAgendarCita;