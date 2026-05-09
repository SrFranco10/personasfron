import { useEffect, useState } from 'react'
import './App.css'

interface Persona {
  id: number
  nombre: string
  apellido: string
  direccion: string
}

function App() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://micropersonasBackend.onrender.com/api/personas')
   
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container">
      <h1>Listado de Personas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Direccion</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.id}</td>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App