import Subtitulo from '../atoms/Subtitulo'
import Parrafo from '../atoms/Parrafo'
import Imagen from '../atoms/Imagen'
import { Link } from 'react-router-dom'
import fachada from '../../assets/fachada-clinica.jpg'

function HeroInicio() {
    return (
        <section className="container mt-4">
            <div className="row align-items-center g-4">
                <div className="col-12 col-lg-6">
                    <Subtitulo
                        texto="Cuidamos la salud de tu mascota con dedicación"
                        clasesExtras="display-6 fw-bold titulo-clinica mb-3"
                    />
                    <Parrafo clasesExtras="lead text-secondary mb-4">
                        Atención médica profesional, preventiva y de urgencia los 365 días del año en Rancagua.
                    </Parrafo>
                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/servicios" className="btn btn-clinica btn-lg">
                            Ver servicios y precios
                        </Link>
                        <a href="tel:+56955668923" className="btn btn-outline-danger btn-lg">
                            Llamar urgencia
                        </a>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <Imagen
                        src={fachada}
                        alt="Fachada de la Veterinaria San Marcos en Rancagua"
                        clasesExtras="rounded-4 shadow w-100"
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroInicio;