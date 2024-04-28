import React, { useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_NOTE } from "../../utils/mutations";
import "./NoteModal.scss";

const NoteModal = ({ announcement, onClose, refetchAnnouncements }) => {
  const [formData, setformData] = useState({
    header: announcement.header,
    body: announcement.body,
  });

  const [updateAnnouncement] = useMutation(UPDATE_NOTE);

  const { header, body } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    updateAnnouncement({
      variables: {
        header,
        body,
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
            id="modalHeader"
            type="text"
            placeholder="Title"
            name="header"
            defaultValue={header}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <h4>Annoucement: </h4>
          <textarea
            rows="20"
            placeholder="Your Announcement"
            type="text"
            name="body"
            defaultValue={body}
            onChange={handleChangeInput}
          />
        </div>
        <div className="app__flex">
          <button
            type="button"
            className="submitBtn"
            onClick={() => handleSubmit()}
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
