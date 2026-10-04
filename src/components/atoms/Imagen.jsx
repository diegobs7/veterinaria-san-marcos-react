
function Imagen(props) {
    return(
        <img src={props.src} alt={props.alt} className={`img-fluid ${props.clasesExtras || ""}`} />
    );
}

export default Imagen;