import { useEffect, useMemo, useRef, useState } from "react"
import { Table } from "../Components/Table"


const URL = "https://randomuser.me/api/?results=30"
function App() {

  const [input, setInput] = useState("")//filtro de usuarios
  const [users, setUsers] = useState([])//lista de usuarios
  const [orderFilter, setOrderFilter] = useState({ name: false, last: false, country: false })//orden de la lista
  const [color, setColor] = useState(false)//color de las filas
  const allUsers = useRef([])
  const usersBackup = useRef([])

  const apiCall = async () => {
    if (allUsers.current.length > 0) return
    const res = await fetch(URL)
    const data = await res.json()
    setUsers(data.results)
    allUsers.current = data.results
    usersBackup.current = data.results
  }

  const handleOrderCountry = () => {
    const newDate = { name: false, last: false, country: !orderFilter.country }
    setOrderFilter(newDate)
    orderUsers(newDate)
  }

  const handleOrder = (accion) => {
    const newDate = [...users].sort((a, b) => {
      if (accion === "name") {
        return a.name.first.localeCompare(b.name.first)
      } else if (accion === "last") {
        return a.name.last.localeCompare(b.name.last)
      }
    })
    setUsers(newDate)
  }
  const orderUsers = (newDate) => {
    const sortedUsers = [...users];
    if (newDate.name) {
      sortedUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (newDate.last) {
      sortedUsers.sort((a, b) => a.name.last.localeCompare(b.name.last));
    } else if (newDate.country) {
      sortedUsers.sort((a, b) => a.location.country.localeCompare(b.location.country));
    } else {
      setUsers(allUsers.current);
      return;
    }
    setUsers(sortedUsers);
  };

  const renderFilter = users.filter((user) => {
    if (input === "") {
      return user
    } else {
      return user.name.first.toLowerCase().includes(input.toLowerCase()) || user.name.last.toLowerCase().includes(input.toLowerCase()) || user.location.country.toLowerCase().includes(input.toLowerCase())
    }
  })

  const handleDelate = (id) => {
    const delateUsers = [...users].filter((user) => user.login.uuid !== id)
    setUsers(delateUsers)
    allUsers.current = delateUsers
  }

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
        color={color}
        handleOrder={handleOrder}
        renderFilter={renderFilter} />
    </>
  )
}

export default App
