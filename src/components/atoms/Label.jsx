
function Label(props) {
    return(
    <label className="form-label fw-bold" htmlFor={props.htmlFor}>
        {props.texto}
    </label>
    );
}

export default Label;