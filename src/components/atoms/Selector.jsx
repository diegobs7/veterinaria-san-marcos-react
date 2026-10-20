function Selector(props) {
    const claseValidacion = props.error ? 'is-invalid' : '';

    return (
        <select
            className={`form-select ${claseValidacion} ${props.className || ''}`}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
        >
            <option value="">{props.textoDefecto || "Seleccione una opcion"}</option>

            {props.opciones.map((opcion, index) => (
                <option key={index} value={opcion.valor}>
                    {opcion.texto}
                </option>
            ))}
        </select>
    );
}

export default Selector;