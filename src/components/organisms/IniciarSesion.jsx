import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import Titulo from '../atoms/Titulo';
import MensajeRegistro from '../molecules/MensajeRegistro';

function IniciarSesion(props) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <Titulo texto="Inicio de sesion" />
                    <form className="p-4 border rounded shadow-sm bg-light">        
                        <CampoFormulario 
                            id="email"
                            textoLabel="Correo electronico"
                            tipo="email"
                            placeholder="ejemplo@duocuc.cl"
                        />
                        <CampoFormulario 
                            id="password"
                            textoLabel="Contraseña"
                            tipo="password"
                            placeholder="xxxxxxxx"
                        />
                        <div className="d-grid mt-4">
                            <Boton tipoBoton="submit" texto="Entrar" variante="primary" />
                        </div>

                        <MensajeRegistro href="#" textoEnlace="Registrate aqui" textoPregunta="¿Aún no tienes una cuenta?"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default IniciarSesion;