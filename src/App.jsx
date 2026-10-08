import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import './index.css'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Contacto from './pages/Contacto';
import RegistrarUsuario from "./components/organisms/RegistroUsuario"

import Footer from './components/organisms/Footer'
import Navbar from './components/organisms/NavBar'
import LogoTitulo from "./components/molecules/LogoTitulo";


function App() {
  return (

    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 w-100">
        <Navbar/>
        <LogoTitulo/>

        <main className="flex-grow-1 w-100">
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<RegistrarUsuario/>}/>
            <Route path="/contacto" element ={<Contacto/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App
