
function TextArea(props) {
    const claseValidacion = props.error ? 'is-invalid' : '';
    return (
        <textarea 
            id = {props.id}
            rows = {props.rows || "3"}
            className={`form-control ${claseValidacion} ${props.className || ''}`}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}
export default TextArea;