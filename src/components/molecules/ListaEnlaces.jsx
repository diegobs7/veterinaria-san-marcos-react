import EnlaceNav from '../atoms/Enlace';

function ListaEnlaces(props) {
    return (
        <ul className={`nav nav-underline ${props.clasesExtras || ""}`.trim()}>
            {props.enlaces.map((enlace) => (
                <li className="nav-item" key={enlace.to}>
                    <EnlaceNav
                        to={enlace.to}
                        texto={enlace.texto}
                        clasesExtras={`nav-link ${enlace.clasesExtras || ""}`.trim()}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ListaEnlaces;