import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PLAYER, ADD_PLAYER } from "../../utils/mutations";
import "./Modal.scss";

const Modal = ({ player, onClose, update_add, refetchPlayers }) => {
  const [formData, setformData] = useState({
    firstName: player.firstName,
    lastName: player.lastName,
    email: player.email,
    phoneNumber: player.phoneNumber,
    preferredRoomate: player.preferredRoomate,
    lodging: player.lodging,
  });
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [addPlayer] = useMutation(ADD_PLAYER);

  const { firstName, lastName, email, phoneNumber, preferredRoomate, lodging } =
    formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (update_add) => {
    const id = player._id;

    if (update_add === "update") {
      try {
        updatePlayer({
          variables: {
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            preferredRoomate,
            lodging,
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        addPlayer({
          variables: {
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            preferredRoomate,
            lodging,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    onClose();
    refetchPlayers();
  };

  return (
    <div className="app__modal__backdrop">
      <div className="app__modal__container">
        <div onClick={onClose} className="close">
          X
        </div>
        {update_add === "Update" ? (
          <h3>
            Update {player.firstName} {player.lastName}
          </h3>
        ) : (
          <h3>Add New Player</h3>
        )}
        <div className="input-field">
          <h4>First Name: </h4>
          <input
            type="text"
            name="firstName"
            //   value={firstName}
            defaultValue={player.firstName}
            onChange={handleChangeInput}
          />
        </div>

        <div className="input-field">
          <h4>Last Name: </h4>
          <input
            type="text"
            defaultValue={player.lastName}
            name="lastName"
            //   value={lastName}
            onChange={handleChangeInput}
          />
        </div>
        <div className="input-field">
          <h4>Email: </h4>
          <input
            type="email"
            defaultValue={player.email}
            name="email"
            //   value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="input-field">
          <h4>Phone: </h4>
          <input
            type="phone"
            defaultValue={player.phoneNumber}
            name="phoneNumber"
            //   value={phoneNumber}
            onChange={handleChangeInput}
          />
        </div>

        {update_add === "Update" ? (
          <>
            <div className="input-field">
              <h4>Preferred Roomate: </h4>
              <input
                type="preferredRoomate"
                defaultValue={player.preferredRoomate}
                name="preferredRoomate"
                //   value={preferredRoomate}
                onChange={handleChangeInput}
              />
            </div>
            <div className="input-field">
              <h4>Logding: </h4>
              <input
                type="lodging"
                defaultValue={player.lodging}
                name="lodging"
                //   value={lodging}
                onChange={handleChangeInput}
              />
            </div>
          </>
        ) : (
          ""
        )}

        <button
          type="button"
          className="submitBtn"
          onClick={() => handleSubmit(update_add)}
        >
          {update_add}
        </button>
      </div>
    </div>
  );
};

export default Modal;
