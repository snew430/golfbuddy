import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  REMOVE_ACTIVE_PLAYER,
  ADD_CURRENT_TO_ACTIVE,
  ADD_CURRENT_TO_WAITLIST,
} from "../../utils/mutations";

import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare, BsCurrencyDollar } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";

import { Modal } from "../../components";
import Auth from "../../utils/auth";

const List = ({ status, trip, refetchTrips }) => {
  const [currentTrip, setCurrentTrip] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteActive] = useMutation(REMOVE_ACTIVE_PLAYER);

  const [moveToActive] = useMutation(ADD_CURRENT_TO_ACTIVE);
  const [moveToWaitlist] = useMutation(ADD_CURRENT_TO_WAITLIST);

  const toggleModal = (trip) => {
    setCurrentTrip(trip);
    setIsModalOpen(!isModalOpen);
  };
  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeleteTrip = async (trip, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return;
    }

    try {
      if (status === "active") {
        await deleteActive({
          variables: { trip },
        });
      }
      refetchTrips();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMovePlayer = async (player, status) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    if (status === "waitlist") {
      try {
        await moveToActive({
          variables: { player, trip },
        });
      } catch (err) {
        console.error(err);
      }
    } else if (status === "active") {
      try {
        await deleteActive({
          variables: { player, trip },
        });
        await moveToWaitlist({
          variables: { player, trip },
        });
      } catch (err) {
        console.error(err);
      }
    }
    refetchTrips();
  };

  const handleActive = async (trip, active) => {
    active = !active;
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await active({
        variables: { trip },
      });
    } catch (err) {
      console.error(err);
    }
    refetchTrips();
  };

  if (!trip || !trip.length) {
    return <h4>No Trips Available</h4>;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          trip={currentTrip}
          onClose={toggleModal}
          update_add={"Update"}
          refetchTrips={refetchTrips}
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
          {trip.map((player) => (
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
                <span className="hovertext" data-hover="Paid or Unpaid">
                  {trip.active ? (
                    <BsCurrencyDollar
                      className="plus"
                      onClick={() => handleActive(trip._id, trip.active)}
                    />
                  ) : (
                    <FiXSquare
                      className="grey"
                      onClick={() => handleActive(trip._id, trip.active)}
                    />
                  )}
                </span>
                <span className="hovertext" data-hover="Delete">
                  <FaTrashAlt
                    className="delete"
                    onClick={() => handleDeleteTrip(trip._id, status)}
                  />
                </span>
                <span className="hovertext" data-hover="Edit">
                  <BsPencilSquare
                    className="edit"
                    onClick={() => toggleModal(trip)}
                  />
                </span>
                {status === "waitlist" ? (
                  <span className="hovertext" data-hover="Add to Trip">
                    <FaPlus
                      className="plus"
                      onClick={() => handleMovePlayer(trip._id, status)}
                    />
                  </span>
                ) : (
                  <span className="hovertext" data-hover="Move to Waitlist">
                    <FaMinus
                      className="minus"
                      onClick={() => handleMovePlayer(trip._id, status)}
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
