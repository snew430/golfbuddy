import React from 'react';
import './Announcements.scss'
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_NOTE } from '../../utils/mutations';
import { QUERY_NOTE } from '../../utils/queries';
import Auth from '../../utils/auth';

const Info = () => {
  const { loading, data: noteData, refetch } = useQuery(QUERY_NOTE);
  const announcements = noteData?.note || [];
  const [updateNote] = useMutation(UPDATE_NOTE);

  console.log(noteData);
  const loggedIn = Auth.loggedIn();
  const admin = Auth.adminLogIn();

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
         </div>
      </div>
    </div>
  );
};

export default Info;
