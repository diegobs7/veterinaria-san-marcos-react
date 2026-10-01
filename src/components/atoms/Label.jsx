function Label(props) {
    <label className="form-label" htmlFor={props.htmlFor}>
        {props.texto}
    </label>
}

export default Label;