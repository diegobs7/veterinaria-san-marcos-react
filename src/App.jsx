import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";

// Páginas públicas
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";
import Registro from "./pages/Registro";
import Blog from "./pages/Blog";
import DetalleBlog from "./pages/DetalleBlog";
import Servicios from "./pages/Servicios";
import DetalleServicio from "./pages/DetalleServicio";
import Evaluacion from "./pages/Evaluacion";
import Categorias from "./pages/Categorias";
import Categoria from "./pages/Categoria";
import Ofertas from "./pages/Ofertas";
import Nosotros from "./pages/Nosotros";
import Citas from "./pages/Citas";
import Perfil from "./pages/Perfil";

// Páginas de administración
import Admin from "./pages/Admin/Admin";
import AdminServicios from "./pages/Admin/AdminServicios";
import AdminServicioListado from "./pages/Admin/AdminServicioListado";
import AdminServicioForm from "./pages/Admin/AdminServicioForm";
import AdminUsuario from "./pages/Admin/AdminUsuario";
import AdminUsuarioListado from "./pages/Admin/AdminUsuarioListado";
import AdminUsuarioForm from "./pages/Admin/AdminUsuarioForm";
import AdminSolicitudes from "./pages/Admin/AdminSolicitudes";
import AdminSolicitudDetalle from "./pages/Admin/AdminSolicitudDetalle";
import AdminUsuarioHistorial from "./pages/Admin/AdminUsuarioHistorial";
import AdminReportes from "./pages/Admin/AdminReportes";

// Componentes estructurales
import Footer from "./components/organisms/Footer";
import Navbar from "./components/organisms/NavBar";
import LogoTitulo from "./components/molecules/LogoTitulo";
import { obtenerSesion } from "./utils/sesionAdmin";

function SoloAdmin(props) {
  const usuario = obtenerSesion();
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== "Administrador") return <Navigate to="/" replace />;
  return props.children;
}

function SoloCliente(props) {
  const usuario = obtenerSesion();
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol === "Administrador") return <Navigate to="/admin" replace />;
  return props.children;
}

function RutasAdmin() {
  return (
    <SoloAdmin>
      <Routes>
        <Route path="/" element={<Admin />} />

        <Route path="/servicios" element={<AdminServicios />} />
        <Route path="/servicios/listado" element={<AdminServicioListado />} />
        <Route path="/servicios/nuevo" element={<AdminServicioForm />} />
        <Route path="/servicios/:id/editar" element={<AdminServicioForm />} />

        <Route path="/usuarios" element={<AdminUsuario />} />
        <Route path="/usuarios/listado" element={<AdminUsuarioListado />} />
        <Route path="/usuarios/nuevo" element={<AdminUsuarioForm />} />
        <Route path="/usuarios/:id/editar" element={<AdminUsuarioForm />} />
        <Route path="/usuarios/:id/historial" element={<AdminUsuarioHistorial />} />

        <Route path="/solicitudes" element={<AdminSolicitudes />} />
        <Route path="/solicitudes/listado" element={<AdminSolicitudes />} />
        <Route path="/solicitudes/:id" element={<AdminSolicitudDetalle />} />

        <Route path="/reportes" element={<AdminReportes />} />
        <Route path="/criticos" element={<AdminReportes />} />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </SoloAdmin>
  );
}

function SitioPublico() {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Navbar />
      <LogoTitulo />

      <main className="flex-grow-1 w-100">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<DetalleServicio />} />
          <Route path="/evaluacion" element={<Evaluacion />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:slug" element={<Categoria />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route
            path="/citas"
            element={
              <SoloCliente>
                <Citas />
              </SoloCliente>
            }
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<RutasAdmin />} />
        <Route path="/*" element={<SitioPublico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;