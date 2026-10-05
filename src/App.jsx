import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Login from './pages/Login';
import Inicio from './pages/Inicio';

import Footer from './components/organisms/Footer'
import Navbar from './components/organisms/NavBar'
import './index.css'
import LogoTitulo from "./components/molecules/LogoTitulo";

function App() {
  return (

    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <LogoTitulo/>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App
