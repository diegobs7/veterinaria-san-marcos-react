function Radio(props) {
    const id = `${props.name}-${props.valor}`;

    return (
        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="radio"
                id={id}
                name={props.name}
                value={props.valor}
                checked={props.checked}
                onChange={props.onChange}
            />
            <label className="form-check-label" htmlFor={id}>
                {props.texto}
            </label>
        </div>
    );
}

export default Radio;
