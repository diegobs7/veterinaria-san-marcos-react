import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import Titulo from '../atoms/Titulo'

function IniciarSesion(props) {
    return (
        <form >

            <Titulo texto = "Inicio de sesion"/>
            <CampoFormulario 
                id = "email"
                textoLabel = "Ingrese su correo electronico"
                tipo = "email"
                placeholder = "ejemplo@duocuc.cl"
            />

            <CampoFormulario 
                id = "password"
                textoLabel = "Ingrese su contraseña"
                tipo = "password"
                placeholder = "Ingrese su contraseña"
            />

            <Boton tipoBoton = "submit" texto = "Iniciar sesion" variante = "primary"/>
        </form>


    );
}

export default IniciarSesion;