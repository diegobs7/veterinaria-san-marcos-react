import { NavLink } from 'react-router-dom';

function Enlace(props) {
    const esNavLink = props.clasesExtras?.includes('nav-link');
    const clasesBase = esNavLink ? '' : 'text-decoration-none text-primary fw-bold';

    return (
        <NavLink
            to={props.to}
            className={({ isActive }) =>
                `${clasesBase} ${props.clasesExtras || ""} ${esNavLink && isActive ? "active" : ""}`.trim()
            }
        >
            {props.texto}
        </NavLink>
    );
}

export default Enlace;