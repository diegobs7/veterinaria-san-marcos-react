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
import Admin from "./pages/Admin";
import AdminProducto from "./pages/AdminProducto";
import AdminProductoListado from "./pages/AdminProductoListado";
import AdminProductoForm from "./pages/AdminProductoForm";
import AdminUsuario from "./pages/AdminUsuario";
import AdminUsuarioListado from "./pages/AdminUsuarioListado";
import AdminUsuarioForm from "./pages/AdminUsuarioForm";

// Componentes estructurales
import TemplateAdmin from "./components/templates/TemplateAdmin";
import Footer from "./components/organisms/Footer";
import Navbar from "./components/organisms/NavBar";
import LogoTitulo from "./components/molecules/LogoTitulo";
import { obtenerSesion } from "./utils/sesionAdmin";

// Vista provisional para Solicitudes (evita pantalla en blanco mientras creas la página definitiva)
function AdminSolicitudes() {
  return (
    <TemplateAdmin>
      <div className="py-4 text-center">
        <h2 className="h4 mb-3">Gestión de Solicitudes</h2>
        <div className="alert alert-info d-inline-block px-4 py-3 text-start">
          <p className="mb-0">
            <strong>Bandeja vacía:</strong> Actualmente no hay solicitudes registradas o este módulo está en preparación.
          </p>
        </div>
      </div>
    </TemplateAdmin>
  );
}

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

        <Route path="/productos" element={<AdminProducto />} />
        <Route path="/productos/listado" element={<AdminProductoListado />} />
        <Route path="/productos/nuevo" element={<AdminProductoForm />} />
        <Route path="/productos/:id/editar" element={<AdminProductoForm />} />

        <Route path="/usuarios" element={<AdminUsuario />} />
        <Route path="/usuarios/listado" element={<AdminUsuarioListado />} />
        <Route path="/usuarios/nuevo" element={<AdminUsuarioForm />} />
        <Route path="/usuarios/:id/editar" element={<AdminUsuarioForm />} />

        <Route path="/solicitudes" element={<AdminSolicitudes />} />
        <Route path="/solicitudes/listado" element={<AdminSolicitudes />} />

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