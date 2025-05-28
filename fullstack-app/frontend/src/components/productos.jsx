import { useState, useEffect } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(res => setProductos(res.data))
      .catch(console.error)
  }, [])

  const handleCrear = () => {
    const nuevo = { nombre, precio: Number(precio) }
    axios.post('http://localhost:3001/productos', nuevo)
      .then(res => {
        setProductos([...productos, res.data])
        setNombre('')
        setPrecio('')
      })
      .catch(console.error)
  }

  const handleEliminar = (id) => {
    axios.delete(`http://localhost:3001/productos/${id}`)
      .then(() => setProductos(productos.filter(p => p.id !== id)))
      .catch(console.error)
  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    doc.text('Listado de Productos', 10, 10)
    let y = 20
    productos.forEach(p => {
      doc.text(`${p.nombre} - $${p.precio}`, 10, y)
      y += 10
    })
    doc.save('productos.pdf')
  }

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">📦 Productos</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            placeholder="Precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-md-2 d-grid">
          <button onClick={handleCrear} className="btn btn-success">
            <i className="bi bi-plus-circle-fill"></i>
          </button>
        </div>
      </div>

      <ul className="list-group mb-3">
        {productos.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {p.nombre} - ${p.precio}
            <button onClick={() => handleEliminar(p.id)} className="btn btn-danger btn-sm">
              <i className="bi bi-trash-fill"></i>
            </button>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button onClick={exportarPDF} className="btn btn-outline-primary">
          <i className="bi bi-filetype-pdf me-2"></i>
          Exportar PDF
        </button>
      </div>
    </div>
  )
}
