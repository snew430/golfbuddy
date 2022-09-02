import React, { useState } from "react";
import { CgCloseO } from 'react-icons/cg';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_NOTE } from '../../utils/mutations';
import "./NoteModal.scss";

const NoteModal = ({ announcement, onClose, refetchAnnouncements }) => {
  const [formData, setformData] = useState({
    header: announcement.header,
    body: announcement.body
  });
  const [updateAnnouncement] = useMutation(UPDATE_NOTE);
  //const [addAnnouncement] = useMutation(ADD_NOTE);

  const { header, body } =
    formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const id = announcement._id;

    
    updateAnnouncement({
        variables: {
            id,
            header,
            body
          },
        });

    onClose();
    refetchAnnouncements();
  };

  return (
    <div id="modal">
      <div className="app__form">
        <div onClick={onClose} className="close">
            <CgCloseO /> 
        </div>
        <div>
            <h4>Title: </h4>
            <input
                className="p-text"
                type="text"
                placeholder="Title"
                name="header"
                //   value={header}
                defaultValue={announcement.header}
                onChange={handleChangeInput}
              />
        </div>
        <div>
        <h4>Annoucement: </h4>
            <textarea
                className="p-text"
                placeholder="Your Announcement"
                type="text"
                name="body"
                //   value={body}
                defaultValue={announcement.body}
                onChange={handleChangeInput}
              />
        </div>
        <div className="app__flex">
          <button
            type="button"
            className="submitBtn"
            onClick={() => handleSubmit()}
          >
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;