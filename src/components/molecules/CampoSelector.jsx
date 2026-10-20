import Label from '../atoms/Label';
import Selector from '../atoms/Selector';

function CampoSelector(props) {
    return (
        <div className="mb-3 text-start">
            <Label htmlFor={props.id} texto={props.textoLabel} />
            <Selector
                id={props.id}
                opciones={props.opciones}
                textoDefecto={props.textoDefecto}
                value={props.value}
                onChange={props.onChange}
                className={props.className}
                error={props.error}
            />
            <div className="invalid-feedback">
                {props.mensajeError}
            </div>
        </div>
    );
}

export default CampoSelector;