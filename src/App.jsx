import { useEffect, useMemo, useRef, useState } from "react"
import { Table } from "../Components/Table"


const URL = "https://randomuser.me/api/?results=30"
function App() {
  const [input, setInput] = useState("")//filtro de usuarios
  const [users, setUsers] = useState([])//lista de usuarios
  const [orderFilter, setOrderFilter] = useState(false)//orden de la lista
  const [color, setColor] = useState(false)//color de las filas
  const allUsers = useRef([])
  const usersBackup = useRef([])

  // Función para llamar a la API
  const apiCall = async () => {
    if (allUsers.current.length > 0) return
    const res = await fetch(URL)
    const data = await res.json()
    setUsers(data.results)
    allUsers.current = data.results
    usersBackup.current = data.results
  }
  // Función para ordenar la lista de usuarios
  const handleOrderCountry = () => {setOrderFilter(!orderFilter)}

  // Función para ordenar la lista de usuarios por nombre
  const handleOrder = (filter) => {
    const newOrder = [...users].sort((a, b) => {
      if (filter === "name") return a.name.first.localeCompare(b.name.first);
      if (filter === "lastname") return a.name.last.localeCompare(b.name.last);
      if (filter === "country") return a.location.country.localeCompare(b.location.country);
    });
    setUsers(newOrder);
  };

  // función para Ordenar la lista por país mediante boton
  const orderedUsers = useMemo(() => {
    const sortedUsers = [...users];
    if (orderFilter) {
      return sortedUsers.sort((a, b) => a.location.country.localeCompare(b.location.country));
    }
    return sortedUsers; 
  }, [users, orderFilter]);

// funcion a renderizar la lista de usuarios filtrados por input
  const renderFilter = useMemo(() => {
    return orderedUsers.filter((user) => {
      if (input === "") {
        return user;
      } else {
        return (
          user.name.first.toLowerCase().includes(input.toLowerCase()) ||
          user.name.last.toLowerCase().includes(input.toLowerCase()) ||
          user.location.country.toLowerCase().includes(input.toLowerCase())
        );
      }
    });
  }, [input, orderedUsers]);

  //función para borrar un usuario
  const handleDelate = (id) => {
    const delateUsers = [...users].filter((user) => user.login.uuid !== id)
    setUsers(delateUsers)
    allUsers.current = delateUsers
  }
  // función para restablecer el estado inicial
  const handleState = () => {
    setUsers(usersBackup.current)
    allUsers.current = usersBackup.current
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <>
      <h1>Lista de Usuarios</h1>
      <div className="buttons">
        <button onClick={() => setColor(!color)}>Pintar Filas</button>
        <button onClick={handleOrderCountry}>ordenar por país</button>
        <button onClick={handleState}>Restablecer Estado Inicial</button>
        <input type="text" placeholder="Ingresa País: " onChange={(event) => setInput(event.target.value)} />
        <p>Numero de Usuarios: {users.length}</p>
      </div>
      <Table
        handleDelate={handleDelate}
        handleOrderCountry={handleOrderCountry}
        handleOrder={handleOrder}
        color={color}
        renderFilter={renderFilter} />
    </>
  )
}

export default App
