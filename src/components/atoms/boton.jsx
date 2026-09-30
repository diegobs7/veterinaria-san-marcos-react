import { useState} from 'react';

function Boton() {
    const [iniciarSesion, setIniciarSesion] = useState(false);


    function alHacerClic() {
        setIniciarSesion(!iniciarSesion)
    };


    return (
        <button className="Boton" onclick= {alHacerClic}>
         {iniciarSesion ? 'Iniciar sesion' : 'Cargandoo...'}
        </button>
    );
}

export default Boton;