import React from 'react';
import './PlayerList.scss';
import {List, Cheat} from '../../components';
import {motion} from 'framer-motion';
import {useQuery} from '@apollo/react-hooks';
import {exportCSVplayer, exportCSVwaitlist} from '../../utils/exportCSV';
import {QUERY_ACTIVE_TRIP} from '../../utils/queries';
import Auth from '../../utils/auth';

const PlayerList = () => {
  const {data: tripData, refetch} = useQuery(QUERY_ACTIVE_TRIP);

  const trip = tripData?.activeTrip || [];

  const loggedIn = Auth.adminLogIn();

  if (!loggedIn) {
    return <Cheat />;
  }

  return (
    <div id="playerList">
      <div className="background">
        <h2 className="head-text">Players Going to {trip.name}</h2>
        <div className="player-list">
          <List
            players={trip.playersActive}
            status={'active'}
            trip={trip._id}
            refetchPlayers={refetch}
          />
        </div>
        <h2 className="secondary-text">Waitlisted Players</h2>
        <div className="player-list">
          <List
            players={trip.playersWaitlist}
            status={'waitlist'}
            trip={trip._id}
            refetchPlayers={refetch}
          />
        </div>

        <motion.div
          className="flex-wrap"
          whileInView={{opacity: [0, 1]}}
          transition={{duration: 0.7}}
        >
          <button onClick={() => exportCSVplayer()}>
            Download Player List
          </button>
          <button onClick={() => exportCSVwaitlist()}>Download Waitlist</button>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerList;
