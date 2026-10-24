import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Subtitulo from '../atoms/Subtitulo';
import Boton from '../atoms/Boton';
import Enlace from '../atoms/Enlace';
import Icono from '../atoms/Icono';
import BotonHamburguesa from '../molecules/BotonHamburguesa';
import ListaEnlaces from '../molecules/ListaEnlaces';
import { obtenerSesion, cerrarSesion } from '../../utils/sesionAdmin';
import './Navbar.css';

function NavBar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const sesion = obtenerSesion();
        setUsuarioActivo(sesion);
        setMenuAbierto(false);
    }, [location.pathname]);

    const cerrarMenu = () => setMenuAbierto(false);
    const alternarMenu = () => setMenuAbierto(!menuAbierto);

    const manejarCerrarSesion = () => {
        cerrarSesion();
        setUsuarioActivo(null);
        navigate('/login');
    };

    const enlacesPrincipales = [
        { to: "/", texto: "Inicio" },
        { to: "/servicios", texto: "Servicios" },
        { to: "/nosotros", texto: "Nosotros" },
        { to: "/blogs", texto: "Blogs" },
        { to: "/contacto", texto: "Contacto" },
        { to: "/evaluacion", texto: "Calificanos" }
    ];

    if (usuarioActivo && usuarioActivo.rol !== 'Administrador') {
        enlacesPrincipales.push({ to: "/citas", texto: "Mis citas" });
    }

    const enlacesSesion = [
        { to: "/registro", texto: "Registrar" },
        { to: "/login", texto: "Iniciar sesion"}
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
                    <div className="offcanvas-backdrop fade show d-lg-none" onClick={cerrarMenu}></div>
                )}

                <div
                    id="menu-principal"
                    data-bs-theme="dark"
                    className={`navbar-clinica__menu offcanvas-lg offcanvas-start ${menuAbierto ? 'show' : ''}`}
                >
                    <div className="offcanvas-header justify-content-between d-lg-none">
                        <Subtitulo nivel="h2" texto="Menú" clasesExtras="offcanvas-title h5 text-white m-0" />
                        <BotonHamburguesa abierto={true} onClick={cerrarMenu} controla="menu-principal" />
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

                            <div className="col-12 col-lg-4 d-flex justify-content-lg-end align-items-center gap-3">
                                {usuarioActivo ? (
                                    <>
                                        <Enlace
                                            to="/perfil"
                                            texto={<><Icono simbolo="👤" />{usuarioActivo.correo.split('@')[0]}</>}
                                        />
                                        <Boton 
                                            tipoBoton="button"
                                            texto="Cerrar sesión"
                                            variante="danger"
                                            clasesExtras="btn-sm fw-bold"
                                            onClick={manejarCerrarSesion}
                                        />
                                    </>
                                ) : (
                                    <ListaEnlaces
                                        enlaces={enlacesSesion}
                                        clasesExtras="flex-row flex-wrap gap-3"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;