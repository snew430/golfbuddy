import React from 'react';
import './PlayerList.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { QUERY_PLAYERS, QUERY_TOURNAMENT } from '../../utils/queries';

const PlayerList = () => {
  const { playerData } = useQuery(QUERY_PLAYERS);
  const { tournamentData } = useQuery(QUERY_TOURNAMENT);

  const players = playerData?.query.players || [];
  const tournament = tournamentData?.query.tournament || [];

  return (
    <div id='playerList'>
        <h2 className='head-text'>Players Going to {tournament.name}</h2>
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