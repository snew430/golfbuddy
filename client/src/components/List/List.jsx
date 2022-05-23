import React from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_PLAYER,
  REMOVE_ACTIVE_PLAYER,
  REMOVE_WAITLIST_PLAYER,
} from "../../utils/mutations";
import { removePlayerId } from "../../utils/localStorage";
import Auth from "../../utils/auth";

const List = ({ players, status, tournament, refetchPlayers }) => {
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [deleteActive] = useMutation(REMOVE_ACTIVE_PLAYER);
  const [deleteWaitlist] = useMutation(REMOVE_WAITLIST_PLAYER);

  console.log(players);

  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeletePlayer = async (player, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return;
    }
    console.log(player, tournament);
    try {
      console.log("click")
      if (status === "active") {
        console.log("active");
        await deleteActive({
          variables: { tournament, player },
        });
      } else if (status === "waitlist") {
        await deleteWaitlist({
          variables: { tournament, player },
        });
      }
      // upon success, remove player's id from localStorage
      removePlayerId(player);
      refetchPlayers();
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

  if (!players || !players.length) {
    return <h4>No Players on the List</h4>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Lodging</th>
          <th>Roommate</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr>
            <td>
              {player.firstName} {player.lastName}
            </td>
            <td>{player.email}</td>
            <td>{player.phoneNumber}</td>
            <td>{player.lodging}</td>
            <td>{player.preferredRoomate}</td>
            <div className="app__flex">
              <button
                className="delete-button"
                onClick={() => handleDeletePlayer(player._id, status)}
              >
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => handleEditPlayer(player._id)}
              >
                Edit
              </button>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
