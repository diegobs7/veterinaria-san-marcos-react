import { Link } from 'react-router-dom';
function EnlaceNav(props) {
    return(
        <li className="nav-item">
            <Link className={`nav-link ${props.clasesExtras || ""}`} to={props.to}>
                {props.texto}
            </Link>
        </li>
    );
}

export default EnlaceNav; 