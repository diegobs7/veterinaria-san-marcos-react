function DetalleServicioTemplate(props) {
    return (
        <div className="container py-4">
            <nav className="mb-4" aria-label="Navegación secundaria">
                {props.navegacion}
            </nav>

            <section className="row g-4">
                <div className="col-lg-8">
                    {props.contenido}
                </div>
                <div className="col-lg-4">
                    {props.lateral}
                </div>
            </section>
        </div>
    );
}

export default DetalleServicioTemplate;