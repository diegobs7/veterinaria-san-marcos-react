import { Link } from 'react-router-dom';
function Enlace(props) {
    return (
        <Link to={props.to} className={`text-decoration-none text-primary fw-bold ${props.clasesExtras || ""}`}>
            {props.texto}
        </Link>
    );
}

export default Enlace;