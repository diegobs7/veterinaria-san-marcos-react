import { Placeholder } from "react-bootstrap";

function TextArea(props) {
    return (
        <textarea 
            className={`form-control ${props.clase || ""}`}
            id={props.id}
            rows = {props.filas || "3"}
            placeholder = {props.Placeholder}
        ></textarea>
    );
}
export default TextArea;