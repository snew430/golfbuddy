import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_PLAYER, UPDATE_PLAYER } from "../../utils/mutations";
import { removePlayerId } from "../../utils/localStorage";
import Auth from "../../utils/auth";

const Master = ({ players }) => {
  const [deletePlayer] = useMutation(DELETE_PLAYER);
  const [updatePlayer] = useMutation(UPDATE_PLAYER);

  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeletePlayer = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log(id);

    if (!token) {
      return false;
    }

    try {
      await deletePlayer({
        variables: { id },
      });

      // upon success, remove player's id from localStorage
      removePlayerId(id);
    } catch (err) {
      console.error(err);
    }
  };

  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleEditPlayer = async (playerId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await updatePlayer({
        variables: { playerId },
      });
    } catch (err) {
      console.error(err);
    }
  };

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
        {players.map((player) => (
          <tr key={player._id}>
            <td>
              {player.firstName} {player.lastName}
            </td>
            <td>{player.email}</td>
            <td>{player.phoneNumber}</td>
            <button
              className="delete-button"
              onClick={() => handleDeletePlayer(player._id)}
            >
              Delete
            </button>
            <button
              className="edit-button"
              onClick={() => handleEditPlayer(player._id)}
            >
              Edit
            </button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Master;
