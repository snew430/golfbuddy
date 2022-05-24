import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PLAYER } from "../../utils/mutations";
import "./Modal.scss";

const Modal = ({ player, onClose }) => {
  const [formData, setformData] = useState({
    firstName: player.firstName,
    lastName: player.lastName,
    email: player.email,
    phoneNumber: player.phoneNumber,
    preferredRoomate: player.preferredRoomate,
    lodging: player.lodging,
  });
  const [updatePlayer] = useMutation(UPDATE_PLAYER);

  const { firstName, lastName, email, phoneNumber, preferredRoomate, lodging } =
    formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const id = player._id;

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
    onClose();
  };

  return (
    <div className="app__modal__backdrop">
      <div className="app__modal__container">
        <div onClick={onClose} className="close">
          X
        </div>
        <h3>
          Edit {player.firstName} {player.lastName}
        </h3>
        <input
          type="text"
          name="firstName"
          //   value={firstName}
          defaultValue={player.firstName}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          defaultValue={player.lastName}
          name="lastName"
          //   value={lastName}
          onChange={handleChangeInput}
        />

        <input
          type="email"
          defaultValue={player.email}
          name="email"
          //   value={email}
          onChange={handleChangeInput}
        />

        <input
          type="phone"
          defaultValue={player.phoneNumber}
          name="phoneNumber"
          //   value={phoneNumber}
          onChange={handleChangeInput}
        />

        <input
          type="preferredRoomate"
          defaultValue={player.preferredRoomate}
          name="preferredRoomate"
          //   value={preferredRoomate}
          onChange={handleChangeInput}
        />

        <input
          type="lodging"
          defaultValue={player.lodging}
          name="lodging"
          //   value={lodging}
          onChange={handleChangeInput}
        />

        <button type="button" className="submitBtn" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Modal;
