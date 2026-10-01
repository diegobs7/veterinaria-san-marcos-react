
function Boton(props) {

    const variante = props.variante || "primary";

    return (
        <button className={`btn btn-${variante}`} onClick={props.onClick} type={props.tipoBoton}>
            {props.texto}
        </button>
    );
}

export default Boton;