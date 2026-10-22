import BloqueInformativo from '../molecules/BloqueInformativo'
import Imagen from '../atoms/Imagen'
import equipo from '../../assets/equipo-clinica.jpg'

function SeccionNosotros() {
    return (
        <section className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
                <BloqueInformativo
                    titulo="Nuestra historia"
                    texto="Veterinaria San Marcos abrió sus puertas en Rancagua en 2009, con la idea de dar a cada mascota la misma atención cercana que le daríamos a un integrante más de la familia. Hoy atendemos alrededor de 25 pacientes al día: perros, gatos, conejos y aves."
                />
                <BloqueInformativo
                    titulo="Nuestro equipo"
                    texto="Contamos con 3 médicos veterinarios, un técnico veterinario y una recepcionista, trabajando juntos para que cada consulta, vacuna o cirugía quede bien registrada y ningún dueño tenga que esperar en el teléfono para saber cómo sigue su mascota."
                />
                <BloqueInformativo
                    titulo="Nuestro compromiso"
                    texto="Sabemos que llevar a tu mascota al veterinario puede ser estresante. Por eso trabajamos con agenda ordenada, fichas clínicas completas y recordatorios de vacunación, para que lo único de lo que tengas que preocuparte sea de acompañar a tu mascota."
                />
            </div>
            <div className="col-12 col-lg-6">
                <Imagen
                    src={equipo}
                    alt="Médica veterinaria saludando junto a un perro en la recepción de la clínica"
                    clasesExtras="rounded-4 shadow w-100"
                />
            </div>
        </section>
    );
}

export default SeccionNosotros;