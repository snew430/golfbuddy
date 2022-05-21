import React from 'react';

const Master = ({ players }) => {
  return (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            {players.map(player => (
                <tr>
                    <td>{player.firstName} {player.lastName}</td>
                    <td>{player.email}</td>
                    <td>{player.phoneNumber}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Master;