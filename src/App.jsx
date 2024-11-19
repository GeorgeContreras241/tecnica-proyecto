import { useEffect, useMemo, useRef, useState } from "react"

const URL = "https://randomuser.me/api/?results=10"
function App() {
  const [users, setUsers] = useState([])
  const [userSort, setUserSort] = useState(false)
  const [color, setColor] = useState(false)
  const [input, setInput] = useState("")
  const usersBackup = useRef([])

  // Función para llamar a la API
  const apiCall = async () => {
    const res = await fetch(URL)
    const data = await res.json()
    setUsers(data.results)
    usersBackup.current = data.results
  }
  const handleDelate = (id) => {
    const delateUser = users.filter((user) => user.login.uuid !== id)
    setUsers(delateUser)
  }
  const handleSorted = (filter) => {
    const newOrder = [...users].sort((a, b) => {
      if (filter === "firts") {
        return a.name.first.localeCompare(b.name.first)
      } else if (filter === "last") {
        return b.name.last.localeCompare(a.name.last)
      } else {
        return users
      }
    })
    setUsers(newOrder)
  }
  useEffect(() => {
    apiCall()
  }, [])
  const filteredUsers = useMemo(() => {
    console.log("filtrando")
    return input !== ""?
      users.filter((user) => user.location.country.toLowerCase().includes(input.toLowerCase()))
      : users
  }, [input, users])
  const sorteredUsers = useMemo(() =>
    filteredUsers.toSorted((a, b) =>
      userSort ? a.location.country.localeCompare(b.location.country)
        : filteredUsers
    ), [userSort, filteredUsers])

  return (
    <>
      <h1>Lista de Usuarios</h1>
      <div className="buttons">
        <button onClick={() => setColor(!color)}>Pintar Filas</button>
        <button onClick={() => setUserSort((prevSort) => !prevSort)}>Ordenar por pais</button>
        <button onClick={() => setUsers(usersBackup.current)}>Restablecer Estado Inicial</button>
        <input type="text" placeholder="Ingresa País:" onChange={(e) => setInput(e.target.value)} value={input} />
        <p>Numero de Usuarios: {filteredUsers.length}</p>
      </div>
      <table>
        <thead>
          <tr className='header'>
            <th>Foto</th>
            <th onClick={() => handleSorted("firts")}>Nombre</th>
            <th onClick={() => handleSorted("last")}>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            sorteredUsers?.map((users, index) => (
              <tr key={users.login.uuid} className={color ? index % 2 === 0 ? 'grid' : 'negro' : ''}>
                <td>
                  <img src={users.picture.thumbnail} alt="" />
                </td>
                <td>{users.name.first}</td>
                <td>{users.name.last}</td>
                <td>{users.location.country}</td>
                <td><button onClick={() => handleDelate(users.login.uuid)}>Eliminar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
