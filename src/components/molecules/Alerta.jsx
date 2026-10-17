function Alerta(props) {
    const variante = props.variante || "warning";

    return (
        <div className={`alert alert-${variante} ${props.clasesExtras || ''}`} role="alert">
            <strong>{props.titulo}</strong> {props.texto}
        </div>
    );
}

export default Alerta;