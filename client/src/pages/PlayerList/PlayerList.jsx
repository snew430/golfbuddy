import React from 'react';
import './PlayerList.scss';

const PlayerList = () => {
  return (
    <div id='playerList'>
        <h2 className='head-text'>Players Going to TournamentNameHere </h2>
        <div className='player-list'>
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Phone</h6>
            <h6>Accomodations</h6>
            <h6>Roommate Preference</h6>
        </div>
        <h2 className='head-text'>Waitlisted Players</h2>
        <div className='player-list'>
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Phone</h6>
            <h6>Accomodations</h6>
            <h6>Roommate Preference</h6>
        </div>
    </div>
  );
}

export default PlayerList;