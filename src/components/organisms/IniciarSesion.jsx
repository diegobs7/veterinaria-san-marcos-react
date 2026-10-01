function IniciarSesion(props) {
    return (
        <form >
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