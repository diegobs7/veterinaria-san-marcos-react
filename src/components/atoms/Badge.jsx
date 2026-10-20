function Badge(props) {
    const variante = props.variante || "primary";

    return (
        <span className={`badge text-bg-${variante} ${props.clasesExtras || ''}`}>
            {props.texto}
        </span>
    );
}

export default Badge;