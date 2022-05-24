import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PLAYER } from "../../utils/mutations";
import "./Modal.scss";

const Modal = ({ player, onClose }) => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preferredRoomate: "",
    lodging: "",
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

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      preferredRoomate,
      lodging,
    } = formData;

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
          placeholder={player.firstName}
          name="firstName"
          value={firstName}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          placeholder={player.lastName}
          name="lastName"
          value={lastName}
          onChange={handleChangeInput}
        />

        <input
          type="email"
          placeholder={player.email}
          name="email"
          value={email}
          onChange={handleChangeInput}
        />

        <input
          type="phone"
          placeholder={player.phoneNumber}
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChangeInput}
        />

        <input
          type="preferredRoomate"
          placeholder={player.preferredRoomate}
          name="preferredRoomate"
          value={preferredRoomate}
          onChange={handleChangeInput}
        />

        <input
          type="lodging"
          placeholder={player.lodging}
          name="lodging"
          value={lodging}
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
