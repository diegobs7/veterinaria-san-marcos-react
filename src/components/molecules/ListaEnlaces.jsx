import EnlaceNav from '../atoms/Enlace';

function ListaEnlaces(props) {
    return(
        <ul className= {`navbar-nav ${props.clasesExtras || ""}`}>
                {props.enlaces.map((enlace, index) => (
                <EnlaceNav
                    key = {index}
                    to = {enlace.to}
                    texto = {enlace.texto}
                    clasesExtras = {enlace.clasesExtras}
                />
                ))}
        </ul>
    );
}

export default ListaEnlaces;