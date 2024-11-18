import React from 'react'

export const Table = ({handleDelate, color, handleOrderName, handleOrderLast,handleOrderCountry, renderFilter}) => {
    return (
        <table>
            <thead>
                <tr className='header'>
                    <td>Foto</td>
                    <th onClick={handleOrderName}>Nombre</th>
                    <th onClick={handleOrderLast}>Apellido</th>
                    <th onClick={handleOrderCountry}>País</th>
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
