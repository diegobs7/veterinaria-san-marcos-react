function Subtitulo(props) {
    const Etiqueta = props.nivel || 'h2';

    return (
        <Etiqueta className={props.clasesExtras}>
            {props.texto}
        </Etiqueta>
    );
}

export default Subtitulo;