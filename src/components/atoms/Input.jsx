function Input(props) {
    return(
        <input type={props.tipo || "text"}
        className="form-control"
        placeholder={props.placeholder}
        id={props.id}
        />
    );
}

export default Input;