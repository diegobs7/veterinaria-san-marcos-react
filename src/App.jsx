import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import './index.css'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Contacto from './pages/Contacto';
import Registro from './pages/Registro'
import Blog from "./pages/Blog"
import Servicios from './pages/Servicios';
import DetalleServicio from './pages/DetalleServicio';
import Evaluacion from './pages/Evaluacion';

import Footer from './components/organisms/Footer'
import Navbar from './components/organisms/NavBar'
import LogoTitulo from "./components/molecules/LogoTitulo";



function App() {
  return (

    <BrowserRouter>
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
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/:id" element={<DetalleServicio />} />
            <Route path="/evaluacion" element={<Evaluacion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
