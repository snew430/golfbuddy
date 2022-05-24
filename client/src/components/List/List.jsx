import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  REMOVE_ACTIVE_PLAYER,
  REMOVE_WAITLIST_PLAYER,
  ADD_CURRENT_TO_ACTIVE,
  ADD_CURRENT_TO_WAITLIST,
} from "../../utils/mutations";
import { removePlayerId } from "../../utils/localStorage";
import Modal from "../../components/Modal/Modal";
import Auth from "../../utils/auth";

const List = ({ players, status, tournament, refetchPlayers }) => {
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteActive] = useMutation(REMOVE_ACTIVE_PLAYER);
  const [deleteWaitlist] = useMutation(REMOVE_WAITLIST_PLAYER);
  const [moveToActive] = useMutation(ADD_CURRENT_TO_ACTIVE);
  const [moveToWaitlist] = useMutation(ADD_CURRENT_TO_WAITLIST);

  const toggleModal = (player) => {
    setCurrentPlayer(player);
    setIsModalOpen(!isModalOpen);
  };
  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeletePlayer = async (player, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return;
    }

    try {
      if (status === "active") {
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
  const handleEditPlayer = async (player) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // try {
    //   await updatePlayer({
    //     variables: { e },
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleMovePlayer = async (player, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    if (status === "waitlist") {
      try {
        await deleteWaitlist({
          variables: { player, tournament },
        });
        await moveToActive({
          variables: { player, tournament },
        });
      } catch (err) {
        console.error(err);
      }
    } else if (status === "active") {
      try {
        await deleteActive({
          variables: { player, tournament },
        });
        await moveToWaitlist({
          variables: { player, tournament },
        });
      } catch (err) {
        console.error(err);
      }
    }
    refetchPlayers();
  };

  if (!players || !players.length) {
    return <h4>No Players on the List</h4>;
  }

  return (
    <>
      {isModalOpen && <Modal player={currentPlayer} onClose={toggleModal} />}
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
            <tr key={player._id}>
              <td>
                {player.firstName} {player.lastName}
              </td>
              <td>
                <a href={`mailto:${player.email}`}>{player.email}</a>
              </td>
              <td>
                <a href={`tel:+${player.phoneNumber}`}>{player.phoneNumber}</a>
              </td>
              <td>{player.lodging}</td>
              <td>{player.preferredRoomate}</td>
              <td>
                <div className="app__flex">
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePlayer(player._id, status)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => toggleModal(player)}
                  >
                    Edit
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleMovePlayer(player._id, status)}
                  >
                    {status === "waitlist"
                      ? "Move to Active"
                      : "Move to Waitlist"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
