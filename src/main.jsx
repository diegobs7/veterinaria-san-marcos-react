import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CategoriasProvider } from './context/CategoriasProvider'
import { ServiciosProvider } from './context/ServiciosProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoriasProvider>
      <ServiciosProvider>
        <App />
      </ServiciosProvider>
    </CategoriasProvider>
  </StrictMode>,
)