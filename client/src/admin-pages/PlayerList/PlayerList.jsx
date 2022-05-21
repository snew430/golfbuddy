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

  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  // const handleDeletePlayer = async (playerId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     await deletePlayer({
  //       variables: { bookId },
  //     });

  //     // upon success, remove book's id from localStorage
  //     deletePlayer(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div id="playerList">
      <div className="background">
        <h2 className="head-text">Players Going to {tournament.name}</h2> 
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
