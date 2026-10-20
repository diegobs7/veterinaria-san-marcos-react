import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Subtitulo from '../atoms/Subtitulo';
import BotonHamburguesa from '../molecules/BotonHamburguesa';
import ListaEnlaces from '../molecules/ListaEnlaces';
import './Navbar.css';

function NavBar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuAbierto(false);
    }, [location.pathname]);

    const cerrarMenu = () => setMenuAbierto(false);
    const alternarMenu = () => setMenuAbierto(!menuAbierto);

    const enlacesPrincipales = [
        { to: "/", texto: "Inicio" },
        { to: "/servicios", texto: "Servicios" },
        { to: "/nosotros", texto: "Nosotros" },
        { to: "/blogs", texto: "Blogs" },
        { to: "/contacto", texto: "Contacto" },
        { to: "/evaluacion", texto: "Calificanos" }
    ];

    const enlacesSesion = [
        { to: "/registro", texto: "Registrar" },
        { to: "/login", texto: "Iniciar sesion", clasesExtras: "fw-bold" }
    ];

    return (
        <nav className="navbar-clinica w-100 shadow-sm py-3">
            <div className="container-fluid px-4">
                <div className="d-flex justify-content-start d-lg-none">
                    <BotonHamburguesa
                        abierto={menuAbierto}
                        onClick={alternarMenu}
                        controla="menu-principal"
                    />
                </div>

                {menuAbierto && (
                    <div
                        className="offcanvas-backdrop fade show d-lg-none"
                        onClick={cerrarMenu}
                    ></div>
                )}

                <div
                    id="menu-principal"
                    data-bs-theme="dark"
                    aria-label="Menú principal"
                    className={`navbar-clinica__menu offcanvas-lg offcanvas-start ${menuAbierto ? 'show' : ''}`}
                >
                    <div className="offcanvas-header justify-content-between d-lg-none">
                        <Subtitulo
                            nivel="h2"
                            texto="Menú"
                            clasesExtras="offcanvas-title h5 text-white m-0"
                        />
                        <BotonHamburguesa
                            abierto={true}
                            onClick={cerrarMenu}
                            controla="menu-principal"
                        />
                    </div>

                    <div className="offcanvas-body">
                        <div className="row w-100 align-items-center m-0">
                            <div className="col-lg-4 d-none d-lg-block"></div>

                            <div className="col-12 col-lg-4 d-flex">
                                <ListaEnlaces
                                    enlaces={enlacesPrincipales}
                                    clasesExtras="flex-column flex-lg-row flex-lg-wrap align-items-start align-items-lg-stretch justify-content-lg-center gap-lg-4 w-100"
                                />
                            </div>

                            <div className="col-12 d-lg-none">
                                <hr className="text-white" />
                            </div>

                            <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
                                <ListaEnlaces
                                    enlaces={enlacesSesion}
                                    clasesExtras="flex-row flex-wrap gap-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;