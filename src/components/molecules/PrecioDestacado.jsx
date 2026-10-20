function PrecioDestacado(props) {
    return (
        <div className={`d-flex flex-column mb-2 ${props.clasesExtras || ''}`}>
            <span className="text-muted small">{props.etiqueta}</span>
            <span className="fs-2 fw-bold text-primary">{props.monto}</span>
        </div>
    );
}

export default PrecioDestacado;