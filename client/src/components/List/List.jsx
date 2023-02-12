import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {
  REMOVE_ACTIVE_PLAYER,
  REMOVE_WAITLIST_PLAYER,
  ADD_CURRENT_TO_ACTIVE,
  ADD_CURRENT_TO_WAITLIST,
  PAID_PLAYER,
} from '../../utils/mutations';
import {removePlayerId} from '../../utils/localStorage';

import {FaTrashAlt} from 'react-icons/fa';
import {BsPencilSquare, BsCheckSquare, BsCurrencyDollar} from 'react-icons/bs';
import {FaPlus, FaMinus} from 'react-icons/fa';
import {FiXSquare} from 'react-icons/fi';

import {Modal} from '../../components';
import Auth from '../../utils/auth';

const List = ({players, status, refetchPlayers}) => {
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteActive] = useMutation(REMOVE_ACTIVE_PLAYER);
  const [deleteWaitlist] = useMutation(REMOVE_WAITLIST_PLAYER);
  const [moveToActive] = useMutation(ADD_CURRENT_TO_ACTIVE);
  const [moveToWaitlist] = useMutation(ADD_CURRENT_TO_WAITLIST);
  const [paidPlayer] = useMutation(PAID_PLAYER);

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
      if (status === 'active') {
        await deleteActive({
          variables: {player},
        });
      } else if (status === 'waitlist') {
        await deleteWaitlist({
          variables: {player},
        });
      }
      // upon success, remove player's id from localStorage
      removePlayerId(player);
      refetchPlayers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMovePlayer = async (player, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    if (status === 'waitlist') {
      try {
        await deleteWaitlist({
          variables: {player},
        });
        await moveToActive({
          variables: {player},
        });
      } catch (err) {
        console.error(err);
      }
    } else if (status === 'active') {
      try {
        await deleteActive({
          variables: {player},
        });
        await moveToWaitlist({
          variables: {player},
        });
      } catch (err) {
        console.error(err);
      }
    }
    refetchPlayers();
  };

  const handlePaid = async (player, paid) => {
    paid = !paid;
    const token = Auth.adminLogIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await paidPlayer({
        variables: {player, paid},
      });
    } catch (err) {
      console.error(err);
    }
    refetchPlayers();
  };

  if (!players || !players.length) {
    return <h4>No Players on the List</h4>;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          player={currentPlayer}
          onClose={toggleModal}
          update_add={'Update'}
          refetchPlayers={refetchPlayers}
        />
      )}
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
                <a href={`tel:${player.phoneNumber}`}>{player.phoneNumber}</a>
              </td>
              <td>{player.lodging}</td>
              <td>{player.preferredRoomate}</td>
              <td>
                <span className="hovertext" data-hover="Paid/ Unpaid">
                  {player.paid ? (
                    <BsCurrencyDollar
                      className="plus"
                      onClick={() => handlePaid(player._id, player.paid)}
                    />
                  ) : (
                    <BsCurrencyDollar
                      className="grey"
                      onClick={() => handlePaid(player._id, player.paid)}
                    />
                  )}
                </span>
                <span className="hovertext" data-hover="Delete">
                  <FaTrashAlt
                    className="delete"
                    onClick={() => handleDeletePlayer(player._id, status)}
                  />
                </span>
                <span className="hovertext" data-hover="Edit">
                  <BsPencilSquare
                    className="edit"
                    onClick={() => toggleModal(player)}
                  />
                </span>
                {status === 'waitlist' ? (
                  <span className="hovertext" data-hover="Add to Trip">
                    <FaPlus
                      className="plus"
                      onClick={() => handleMovePlayer(player._id, status)}
                    />
                  </span>
                ) : (
                  <span className="hovertext" data-hover="Move to Waitlist">
                    <FaMinus
                      className="minus"
                      onClick={() => handleMovePlayer(player._id, status)}
                    />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
