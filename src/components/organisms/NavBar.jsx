import ListaEnlaces from '../molecules/ListaEnlaces';

function NavBar() {
    const enlacesPrincipales = [
        { to: "/", texto: "Inicio" },
        { to: "/servicios", texto: "Servicios" },
        { to: "/nosotros", texto: "Nosotros" },
        { to: "/blogs", texto: "Blogs" },
        { to: "/contacto", texto: "Contacto" }
    ];

    const enlacesSesion = [
        { to: "/registro", texto: "Registrar" },
        { to: "/login", texto: "Inicio sesion", clasesExtras: "fw-bold text-primary" }
    ];
    
    return (
        <nav className="navbar bg-light w-100 border-bottom shadow-sm py-3">
            <div className="container-fluid px-4">
                <div className="row w-100 align-items-center m-0">
                    <div className="col-lg-4 d-none d-lg-block"></div>
                    <div className="col-12 col-lg-4 d-flex justify-content-center mb-3 mb-lg-0">
                        <ListaEnlaces
                            enlaces={enlacesPrincipales}
                            clasesExtras="flex-row flex-wrap justify-content-center gap-3 m-0 p-0"
                        />
                    </div>
                    <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                        <ListaEnlaces
                            enlaces={enlacesSesion}
                            clasesExtras="flex-row flex-wrap gap-3 m-0 p-0"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;