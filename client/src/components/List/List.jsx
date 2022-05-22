import React from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  DELETE_PLAYER,
  UPDATE_PLAYER,
  REMOVE_ACTIVE_PLAYER,
  REMOVE_WAITLIST_PLAYER,
} from "../../utils/mutations";
import { removePlayerId } from "../../utils/localStorage";
import Auth from "../../utils/auth";

const List = ({ players, status }) => {
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [deleteActive] = useMutation(REMOVE_ACTIVE_PLAYER);
  const [deleteWaitlist] = useMutation(REMOVE_WAITLIST_PLAYER);

  console.log(players);

  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeletePlayer = async (playerId, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return;
    }

    try {
      console.log("click")
      if (status === "active") {
        console.log("active");
        await deleteActive({
          variables: { playerId },
        });
      } else if (status === "waitlist") {
        await deleteWaitlist({
          variables: { playerId },
        });
      }
      // upon success, remove player's id from localStorage
      removePlayerId(playerId);
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
          <th>Accomodations</th>
          <th>Roommate Preference</th>
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
            <button
              className="delete-button"
              onClick={() => handleDeletePlayer(player.playerId, status)}
            >
              Delete
            </button>
            <button
              className="edit-button"
              onClick={() => handleEditPlayer(player.playerId)}
            >
              Edit
            </button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
