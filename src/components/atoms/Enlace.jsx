function Enlace(props) {
    return (
        <a href={props.href} className="text-decoration-none text-primary fw-bold">
            {props.texto}
        </a>
    );
}

export default Enlace;