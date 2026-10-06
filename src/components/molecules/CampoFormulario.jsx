
import Label from '../atoms/Label';
import Input from '../atoms/Input';

function CampoFormulario(props){
    return (
        <div className="mb-3 text-start">
            <Label htmlFor= {props.id} texto = {props.textoLabel}/>
            <Input 
            id={props.id}
            tipo={props.tipo}
            placeholder = {props.placeholder}
            value={props.value}
            onChange ={props.onChange}
            className={props.className}
            error = {props.error}
            />
            <div className="invalid-feedback">
                {props.mensajeError}
            </div>
        </div>
    );
}

export default CampoFormulario;