import { NavLink } from 'react-router-dom';

function Enlace(props) {
    const esNavLink = props.clasesExtras?.includes('nav-link');
    const esBoton = props.clasesExtras?.includes('btn');
    const clasesBase = esNavLink ? '' : esBoton ? 'text-decoration-none' : 'text-decoration-none text-primary fw-bold';

    return (
        <NavLink
            to={props.to}
            end={props.end}
            className={({ isActive }) =>
                `${clasesBase} ${props.clasesExtras || ""} ${esNavLink && isActive ? "active" : ""}`.trim()
            }
        >
            {props.texto}
        </NavLink>
    );
}

export default Enlace;