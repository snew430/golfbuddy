import React from "react";
import { Link } from "react-router-dom";
import "./PlayerList.scss";
import List from "../../components/List/List";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/react-hooks";

import { exportCSVplayer, exportCSVwaitlist } from "../../utils/exportCSV";

import { QUERY_TRIPS } from "../../utils/queries";

import Auth from "../../utils/auth";

const PlayerList = () => {
  const { data: tripData, refetch } = useQuery(QUERY_TRIPS);

  const trip = tripData?.trips[0] || [];

  const loggedIn = Auth.loggedIn();

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
        <h2 className="head-text">Players Going to {trip.name}</h2>
        <div className="player-list">
          <List
            players={trip.playersActive}
            status={"active"}
            trip={trip._id}
            refetchPlayers={refetch}
          />
        </div>
        <h2 className="secondary-text">Waitlisted Players</h2>
        <div className="player-list">
          <List
            players={trip.playersWaitlist}
            status={"waitlist"}
            trip={trip._id}
            refetchPlayers={refetch}
          />
        </div>

        <motion.div
          className="app__flex"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <button onClick={ () => exportCSVplayer() } >Download Player List</button>
        </motion.div>

        <motion.div
          className="app__flex"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <button onClick={ () => exportCSVwaitlist() } >Download Waitlist</button>
        </motion.div>
        
        <motion.div
          className="app__flex"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <Link to="../Message">
            <button className="final">Email the Players</button>
          </Link>

        </motion.div>
      </div>
    </div>
  );
};

export default PlayerList;
