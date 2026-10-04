import { Link } from 'react-router-dom';

function EnlaceNav(props) {
    return(
        <li className="nav-item">
            <link className={`nav-link ${props.clasesExtras || ""}`} to={props.to}>
                {props.texto}
            </link>
        </li>

    );
}

export default EnlaceNav; 