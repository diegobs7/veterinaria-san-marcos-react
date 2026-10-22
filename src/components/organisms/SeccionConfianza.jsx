import BloqueInformativo from '../molecules/BloqueInformativo'

function SeccionConfianza() {
    return (
        <section className="row g-4">
            <div className="col-12 col-md-4">
                <BloqueInformativo
                    titulo="Disponibilidad continua"
                    texto="Abiertos de lunes a domingo de 8:00 a 22:00 hrs, todos los días del año."
                />
            </div>
            <div className="col-12 col-md-4">
                <BloqueInformativo
                    titulo="Tecnología diagnóstica"
                    texto="Laboratorio propio y equipamiento para entregar resultados en el día."
                />
            </div>
            <div className="col-12 col-md-4">
                <BloqueInformativo
                    titulo="Atención sin estrés"
                    texto="Espacios adaptados para que tu mascota se sienta cómoda y segura."
                />
            </div>
        </section>
    );
}

export default SeccionConfianza;