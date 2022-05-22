import React, { useEffect } from "react";
import "./PlayerList.scss";
import List from "../../components/List/List";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { QUERY_TOURNAMENTS } from "../../utils/queries";

import Auth from "../../utils/auth";

const PlayerList = () => {
  const { data: tournamentData } = useQuery(QUERY_TOURNAMENTS);

  const tournament = tournamentData?.tournaments[0] || [];

  const loggedIn = Auth.loggedIn();

  console.log(tournament);

  if (!loggedIn) {
    return (
      <div>
        You need to log in first. Don't cheat by looking at something you're not
        supposed to. <br />
        Makes me think you cheat at golf too...
      </div>
    );
  }
  return (
    <div id="playerList">
      <div className="background">
        <h2 className="head-text">Players Going to {tournament.name}</h2>
        {/* <div className="app__flex">
          <button>Email Tournament Player List</button>
        </div> */}
        <div className="player-list">
          <List players={tournament.playersActive} status={"active"} />
        </div>
        <h2 className="head-text">Waitlisted Players</h2>
        <div className="player-list">
          <List players={tournament.playersWaitlist} status={"waitlist"} />
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
