function Input(props) {
    return(
        <input
        type={props.tipo || "text"}
        className={props.className}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        />
    );
}

export default Input;