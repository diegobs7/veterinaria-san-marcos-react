function Selector(props) {
    return(
        <select className="form-select" id={props.id} required = {props.required}>

            <option value="">Seleccione una opcion</option>

            {props.opciones.map((opcion, index) => (
                <option key={index} value={opcion.valor}>
                    {opcion.texto}
                </option>
            ))}            

        </select>
    );
}

export default Selector;