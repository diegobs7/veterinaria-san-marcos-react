function Boton(props) {
    const variante = props.variante || "primary";

    return (
        <button
            type={props.tipoBoton}
            className={`btn btn-${variante} ${props.clasesExtras || ""}`.trim()}
            onClick={props.onClick}
            aria-label={props.ariaLabel}
            aria-expanded={props.ariaExpanded}
            aria-controls={props.ariaControls}
        >
            {props.texto}
        </button>
    );
}

export default Boton;