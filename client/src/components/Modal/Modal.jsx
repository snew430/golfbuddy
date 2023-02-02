import React, {useState} from 'react';
import {CgCloseO} from 'react-icons/cg';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_PLAYER, ADD_PLAYER} from '../../utils/mutations';
import './Modal.scss';

const Modal = ({player, onClose, update_add, refetchPlayers}) => {
  const [formData, setformData] = useState({
    id: player._id,
    firstName: player.firstName,
    lastName: player.lastName,
    email: player.email,
    phoneNumber: player.phoneNumber,
    preferredRoomate: player.preferredRoomate,
    lodging: player.lodging,
  });
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [addPlayer] = useMutation(ADD_PLAYER);

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value});
  };

  const handleSubmit = async (update_add) => {

    if (update_add === 'Update') {
      try {
        updatePlayer({
          variables: formData,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        addPlayer({
          variables: formData,
        });
      } catch (err) {
        console.error(err);
      }
    }
    onClose();
    refetchPlayers();
  };

  return (
    <div id="modal">
      <div className="app__form">
        <div onClick={onClose} className="close">
          <CgCloseO />
        </div>
        {update_add === 'Update' ? (
          <h3>
            Update {player.firstName} {player.lastName}
          </h3>
        ) : (
          <h3>Add New Player</h3>
        )}
        <div>
          <h4>First Name: </h4>
          <input
            type="text"
            name="firstName"
            //   value={firstName}
            defaultValue={player.firstName}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <h4>Last Name: </h4>
          <input
            type="text"
            defaultValue={player.lastName}
            name="lastName"
            //   value={lastName}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <h4>Email: </h4>
          <input
            type="email"
            defaultValue={player.email}
            name="email"
            //   value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <h4>Phone: </h4>
          <input
            type="phone"
            defaultValue={player.phoneNumber}
            name="phoneNumber"
            //   value={phoneNumber}
            onChange={handleChangeInput}
          />
        </div>

        {update_add === 'Update' ? (
          <>
            <div>
              <h4>Preferred Roomate: </h4>
              <input
                type="preferredRoomate"
                defaultValue={player.preferredRoomate}
                name="preferredRoomate"
                //   value={preferredRoomate}
                onChange={handleChangeInput}
              />
            </div>
            <div>
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
          ''
        )}
        <div className="app__flex">
          <button
            type="button"
            className="submitBtn"
            onClick={() => handleSubmit(update_add)}
          >
            {update_add}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
