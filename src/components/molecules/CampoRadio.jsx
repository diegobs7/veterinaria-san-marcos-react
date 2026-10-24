import Radio from '../atoms/Radio';

function CampoRadio(props) {
    return (
        <fieldset className="mb-3 text-start">
            <legend className="form-label fw-bold fs-6">{props.textoLabel}</legend>
            {props.opciones.map((opcion) => (
                <Radio
                    key={opcion.valor}
                    name={props.name}
                    valor={opcion.valor}
                    texto={opcion.texto}
                    checked={props.value === opcion.valor}
                    onChange={props.onChange}
                />
            ))}
        </fieldset>
    );
}

export default CampoRadio;
