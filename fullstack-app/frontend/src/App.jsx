import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Productos from './components/productos'
import Personas from './components/personas'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const location = useLocation()

  // Título dinámico
  let titulo = 'Gestión de Productos y Usuarios'
  if (location.pathname === '/productos') titulo = '🛒 Ingrese un Producto'
  if (location.pathname === '/usuarios') titulo = '👥 Ingrese un Usuario '

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '800px' }}>
        <h1 className="text-center mb-4">{titulo}</h1>

        {/* Navegación con Links */}
        <div className="d-flex justify-content-center mb-4">
          <Link to="/productos" className="btn btn-primary mx-2">Productos</Link>
          <Link to="/usuarios" className="btn btn-secondary mx-2">Personas</Link>
        </div>

        {/* Rutas */}
        <Routes>
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuarios" element={<Personas />} />
          <Route path="*" element={<div className="text-center">Seleccioná una opción arriba.</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
