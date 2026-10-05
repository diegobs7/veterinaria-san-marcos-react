function Parrafo(props) {
    return (
        <p className={`mb-0 ${props.clasesExtras || ""}`}>
            {props.children}
        </p>
    );
}

export default Parrafo;