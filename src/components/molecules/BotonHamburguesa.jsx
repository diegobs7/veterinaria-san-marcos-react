import Boton from '../atoms/Boton';

function BotonHamburguesa(props) {
    return (
        <Boton
            variante="outline-light"
            tipoBoton="button"
            clasesExtras="d-lg-none"
            onClick={props.onClick}
            ariaLabel={props.abierto ? "Cerrar menú" : "Abrir menú"}
            ariaExpanded={props.abierto}
            ariaControls={props.controla}
            texto={
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    {props.abierto
                        ? <path d="M6 6l12 12M18 6L6 18" />
                        : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
            }
        />
    );
}

export default BotonHamburguesa;