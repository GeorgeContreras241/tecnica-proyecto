import React from 'react'

export const Table = ({handleDelate, handleOrder,color,handleOrderCountry, renderFilter}) => {
    return (
        <table>
            <thead>
                <tr className='header'>
                    <th>Foto</th>
                    <th onClick={() => handleOrder("name")}>Nombre</th>
                    <th onClick={() => handleOrder("lastname")}>Apellido</th>
                    <th onClick={() => handleOrderCountry()}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    renderFilter.map((users, index) => (
                        <tr key={users.login.uuid} className={color ? index % 2 == 0 ? "negro" : "gris" : ""}>
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
    )
}
