import Subtitulo from '../atoms/Subtitulo'
import Imagen from '../atoms/Imagen';
import ItemInformacion from '../molecules/ItemInformacion';
import ImagenFooter from '../../assets/perro-gato.png'


function Footer(props) {
    return(
        <footer id= "contacto" className="footer-sitio mt-5 py-2">
            <div className="container">
                <div className="row text-center align-items-center">

                    <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                        <Subtitulo texto = "Contacto" clasesExtras = "fs-5 mb-3"/>
                            <ItemInformacion icono="📞" texto = "+569-55668923"/>
                            <ItemInformacion icono="✉️" texto = "vetsanmarcos@gmail.com"/>
                            <ItemInformacion icono="📍" texto = "Rancagua, Region del Libertador General Bernardo O'higgins"/>
                    </div>
                    <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                        <Subtitulo texto = "Horario de atencion" clasesExtras = "fs-5 mb-3"/>
                            <ItemInformacion icono="📅" texto = "Los 365 dias del año"/>
                            <ItemInformacion icono="⏳" texto = "Atencion desde las 8 AM hasta las 22 hrs."/>
                    </div>

                    <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-center align-items-center">
                        <Imagen src={ImagenFooter} alt ="Logo de un perro y gato del footer" clasesExtras="w-30"/>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;