import Label from '../atoms/Label';
import Parrafo from '../atoms/Parrafo';
import PeekRating from '../atoms/PeekRating'

function CampoCalificacion(props) {
    return (
        <div className="mb-3 text-start">
            <Label texto={props.textoLabel} />
            <div>
                <PeekRating
                    value={props.value}
                    onChange={props.onChange}
                    labels={props.etiquetas}
                    ariaLabel={props.textoLabel}
                    idleColor="#ced4da"
                    size={36}
                />
            </div>
            {props.mensajeError && (
                <Parrafo clasesExtras="text-danger small mt-1">
                    {props.mensajeError}
                </Parrafo>
            )}
        </div>
    );
}

export default CampoCalificacion;