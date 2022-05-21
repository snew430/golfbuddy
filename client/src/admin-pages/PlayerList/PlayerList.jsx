import React, { useEffect } from "react";
import "./PlayerList.scss";
import List from '../../components/List/List';
import { useQuery, useMutation } from "@apollo/react-hooks";

import { QUERY_TOURNAMENTS } from "../../utils/queries";
import { DELETE_PLAYER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const PlayerList = () => {
  const { data: tournamentData } = useQuery(QUERY_TOURNAMENTS);

  const [deletePlayer] = useMutation(DELETE_PLAYER);

  const tournament = tournamentData?.tournaments[0] || []; 
  const activePlayers = tournament.playersActive || [];
  const waitlistPlayers = tournament.playersWaitlist || [];
  
  const loggedIn = Auth.loggedIn();

  return (
    <div id="playerList">
      <div className="background">
        <h2 className="head-text">Players Going to {tournament.name}</h2> 
        {/* <div className="app__flex">
          <button>Email Tournament Player List</button>
        </div> */}
        <div className="player-list">
          <List
            players={activePlayers} 
          />
        </div>
        <h2 className="head-text">Waitlisted Players</h2>
        <div className="player-list">
          <List
            players={waitlistPlayers}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
