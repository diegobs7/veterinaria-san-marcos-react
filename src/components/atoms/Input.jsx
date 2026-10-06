function Input(props) {
    const claseValidacion = props.error ? 'is-invalid' : '';
    return(
        <input
        type={props.tipo || "text"}
        className={`form-control ${claseValidacion} ${props.className || ''}`}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        />
    );
}

export default Input;