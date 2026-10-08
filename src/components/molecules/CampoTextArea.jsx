import TextArea from '../atoms/TextArea';
import Label from '../atoms/Label';

function CampoTextArea(props) {
    return (
        <div className="mb-3 text-start">
            <Label htmlFor={props.id} texto={props.textoLabel} />
            <TextArea
                id={props.id}
                rows={props.rows}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                error={props.error}
            />
            <div className="invalid-feedback">
                {props.mensajeError}
            </div>

        </div>
    );
}

export default CampoTextArea;