import React from 'react';

const List = ({ players }) => {
  return (
    <table>
     <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Accomodations</th>
        <th>Roommate Preference</th>
      </tr>
    </thead>
    <tbody>
      {players.map(player => (
        <tr>
          <td>{player.firstName} {player.lastName}</td>
          <td>{player.email}</td>
          <td>{player.phoneNumber}</td>
          <td>{player.lodging}</td>
          <td>{player.preferredRoomate}</td>
        </tr>
      ))}
    </tbody>
    </table>
  );
}

export default List