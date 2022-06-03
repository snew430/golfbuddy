import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_PLAYER } from "../../utils/mutations";
import { removePlayerId } from "../../utils/localStorage";
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Modal from "../../components/Modal/Modal";
import Auth from "../../utils/auth";

const Master = ({ players, refetchPlayers }) => {
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePlayer] = useMutation(DELETE_PLAYER);

  const toggleModal = (player) => {
    setCurrentPlayer(player);
    setIsModalOpen(!isModalOpen);
  };

  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeletePlayer = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

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
    refetchPlayers();
  };

  // create function that accepts the player's mongo _id value as param and deletes the player from the database

  return (
    <>
      {" "}
      {isModalOpen && (
        <Modal
          player={currentPlayer}
          onClose={toggleModal}
          update_add="Update"
          refetchPlayers={refetchPlayers}
        />
      )}
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
              <td>
                <a href={`mailto:${player.email}`}>{player.email}</a>
              </td>
              <td>
                <a href={`tel:+${player.phoneNumber}`}>{player.phoneNumber}</a>
              </td>
              <td>
                <span class="hovertext" data-hover="Delete">
                  <FaTrashAlt
                    className="tooltip delete"
                    onClick={() => handleDeletePlayer(player._id)}
                  />
                </span>
              <span class="hovertext" data-hover="Edit">
                <BsPencilSquare
                  className="edit"
                  onClick={() => toggleModal(player)}
                />
              </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Master;
