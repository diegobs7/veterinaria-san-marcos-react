import Label from "../atoms/Label";
import Selector from "../atoms/Selector";

function CampoSelector(props) {
    return (
        <div className="mb-3">
            <Label id ={props.id} texto={props.textoLabel}/>
            <Selector 
            id = {props.id}
            required = {props.required}
            opciones = {props.opciones}
            />
        </div>
    );
}

export default CampoSelector;