import { useState, useEffect } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'

export default function Personas() {
  const [personas, setPersonas] = useState([])
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [edad, setEdad] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios')
      .then(res => setPersonas(res.data))
      .catch(console.error)
  }, [])

  const handleCrear = () => {
    const nueva = { nombre, email, edad: Number(edad) }
    axios.post('http://localhost:3001/usuarios', nueva)
      .then(res => {
        setPersonas([...personas, res.data])
        setNombre('')
        setEmail('')
        setEdad('')
      })
      .catch(console.error)
  }

  const handleEliminar = (id) => {
    axios.delete(`http://localhost:3001/usuarios/${id}`)
      .then(() => setPersonas(personas.filter(p => p.id !== id)))
      .catch(console.error)
  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    doc.text('Listado de Personas', 10, 10)
    let y = 20
    personas.forEach(p => {
      doc.text(`${p.nombre} - ${p.email} - ${p.edad} años`, 10, y)
      y += 10
    })
    doc.save('personas.pdf')
  }

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">👥 Ingrese Un Usuario</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            placeholder="Edad"
            value={edad}
            onChange={e => setEdad(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-md-1 d-grid">
          <button onClick={handleCrear} className="btn btn-success">
            <i className="bi bi-person-plus-fill"></i>
          </button>
        </div>
      </div>

      <ul className="list-group mb-3">
        {personas.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {p.nombre} - {p.email} - {p.edad} años
            <button onClick={() => handleEliminar(p.id)} className="btn btn-danger btn-sm">
              <i className="bi bi-backspace-fill"></i>
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
