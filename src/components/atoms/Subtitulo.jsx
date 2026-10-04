function Subtitulo(props) {
    return (
        <h2 className={props.clasesExtras}>
            {props.texto}
        </h2>
    );
}

export default Subtitulo;