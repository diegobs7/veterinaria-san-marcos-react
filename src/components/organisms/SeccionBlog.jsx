import ArticuloBlog from '../molecules/ArticuloBlog';
import images from '../../assets/images.jpg'
import perrito from '../../assets/perrito-scaled.jpg'

function SeccionBlog(props) {
    return (
        <section className="container mt-5 mb-5">
            <div className="row g-4 justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <ArticuloBlog
                        imagen={images}
                        altImagen="salud renal en gatos"
                        categoria="Salud Felina"
                        titulo="El eje intestino-riñón y la enfermedad renal crónica (ERC)"
                        fuente="Fuente: ACVS (Colegio Americano de Cirujanos Veterinarios)"
                        resumen="Estudios demuestran que la microbiota intestinal felina juega un rol crucial en la progresión de la ERC. El uso de prebióticos y probióticos ayuda a reducir toxinas."
                        ruta="/detalle-blog-1"
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ArticuloBlog
                        imagen={perrito}
                        altImagen="perro recibiendo vacuna"
                        categoria="Prevención"
                        titulo="Calendario de vacunación canina 2026: Lo que debes saber"
                        fuente="Fuente: Ministerio de Salud"
                        resumen="Mantener las vacunas de tu perro al día no solo previene enfermedades mortales como el parvovirus, sino que también protege a tu familia."
                        ruta="/detalle-blog-2"
                    />
                </div>                       
            </div>

        </section>

    );
}
export default SeccionBlog;