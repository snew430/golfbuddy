import React from "react";
import { Link } from "react-router-dom";
import "./ManageTrips.scss";
import List from "../../components/List/TripList";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/react-hooks";

import { exportCSVplayer, exportCSVwaitlist } from "../../utils/exportCSV";

import { QUERY_BASIC_TRIPS } from "../../utils/queries";

import Auth from "../../utils/auth";

const ManageTrips = () => {
  const { data: tripData, refetch } = useQuery(QUERY_BASIC_TRIPS);

  const trip = tripData?.trips[0] || [];

  const loggedIn = Auth.loggedIn();

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
    <div id="manageTrips">
      <div className="background">
        <h2 className="head-text">{trip.name}</h2>
        <div className="trip-list">
          <List
            startDate={trip.startDate}
            endDate={trip.endDate}
            status={"active"}
            trip={trip._id}
          />
        </div>
        
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

export default ManageTrips;
