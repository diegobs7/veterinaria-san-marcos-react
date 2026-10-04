import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Login from './pages/Login';
import Footer from './components/organisms/Footer'
import Navbar from './components/organisms/NavBar'

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/> {/*Esta ruta sera para el login*/}
        {/* <Route path="/inicio" element={<Inicio />} /> */} {/*Esta ruta sera para la pagina principal, de momento estara el de login pero luego debemos cambiarlo */}
        {/* <Route path="/registro" element={<RegistroUsuario />} /> */} {/*Esta ruta sera para el regisrto de usuario*/}
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App
