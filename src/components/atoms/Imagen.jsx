
function Imagen(props) {
    return(
        <img src={props.imagen} alt={props.textoAlter} className={`img-fluid ${props.clasesExtras || ""}`} />
    );
}

export default Imagen;