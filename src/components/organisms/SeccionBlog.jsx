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
                        ruta="/blogs/1"
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ArticuloBlog
                        imagen={perrito}
                        altImagen="Tratamiento de cáncer en perros"
                        categoria="Oncología Canina"
                        titulo="Uso de Toceranib en el tratamiento de mastocitomas caninos"
                        fuente="Fuente: AVMA (Asociación Americana de Medicina Veterinaria)"
                        resumen="El fosfato de toceranib (comercializado como Palladia) fue el primer fármaco aprobado por la FDA específicamente para el cáncer en perros. Es una terapia dirigida que bloquea el crecimiento de los vasos sanguíneos que alimentan a los tumores."
                        ruta="/blogs/2"
                    />
                </div>                       
            </div>

        </section>

    );
}
export default SeccionBlog;