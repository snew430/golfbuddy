import React, { useState } from 'react';
import './Announcements.scss'
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_NOTE } from '../../utils/mutations';
import { QUERY_NOTE } from '../../utils/queries';
import NoteModal from '../../components/NoteModal/NoteModal';
import Auth from '../../utils/auth';

const Info = ({ announcement, refetchAnnouncements}) => {
  const { loading, data: noteData, refetch } = useQuery(QUERY_NOTE);
  const announcements = noteData?.note || [];
 
  const [currentAnnouncement, setCurrentAnnouncement] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(noteData);
  const loggedIn = Auth.loggedIn();
  const admin = Auth.adminLogIn();

  const toggleModal = (announcement) => {
    setCurrentAnnouncement(announcement);
    setIsModalOpen(!isModalOpen);
  };

  if (!loggedIn) {
    return (
      <div className="cheat-container">
        <h3 className="cheat-text">
          You need to log in first. Don't cheat by looking at something you're
          not supposed to. <br />
          Makes me think you cheat at golf too
        </h3>
      </div>
    );
  }

  return (
    <>
    {" "}
    {isModalOpen && (
      <NoteModal
        announcement={currentAnnouncement}
        onClose={toggleModal}
        refetchAnnouncements={refetchAnnouncements}
      />
    )}
      <div id="announcement">
        <div className="background">
          <div className="background2">
            <h2 className="head-text">Announcements</h2>
          
          {announcements.map((announcement) =>
              <div data-id={announcement._id}>
                <h4 className="h4-text">{announcement.header}</h4>
                <p className="p-text">{announcement.body}</p>
              </div>
          )}
          {loggedIn ? (
            <div className="app__flex">
              <button type="button" onClick={() => toggleModal(announcement)}>
                Edit Announcement
              </button>
            </div>
          ) :
          <>
          </>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
