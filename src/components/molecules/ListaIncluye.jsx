function ListaIncluye(props) {
    return (
        <ul className={`mb-3 ${props.clasesExtras || ''}`}>
            {props.items.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default ListaIncluye;