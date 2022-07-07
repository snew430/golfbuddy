import React from "react";
import { Link } from "react-router-dom";
import "./ManageTrips.scss";
import List from "../../components/List/TripList";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/react-hooks";

// import { exportCSVplayer, exportCSVwaitlist } from "../../utils/exportCSV";

import { QUERY_BASIC_TRIPS } from "../../utils/queries";
import { MAKE_TRIP_ACTIVE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const ManageTrips = () => {
  const { data: tripData, refetch } = useQuery(QUERY_BASIC_TRIPS);
  const [makeActive] = useMutation(MAKE_TRIP_ACTIVE);

  const trips = tripData?.trips || [];

  console.log(trips);

  const loggedIn = Auth.loggedIn();

  const handleActiveClick = async (changeTripToActiveId) => {
    try {
      await makeActive({
        variables: { changeTripToActiveId },
      });
    } catch (err) {
      console.error(err);
    }

    refetch();
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
    <div id="manageTrips">
      <div className="background">
        {trips.map((trip) => (
          <div key={trip._id} className="head-text">
            {trip.name}
            <div>{trip.startDate}</div>
            <div>Players: {trip.activePlayerCount}</div>
            <div>Current Trip: {trip.active ? "yes" : "no"}</div>
            {!trip.active ? (
              <button onClick={() => handleActiveClick(trip._id)}>
                Make Active
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}

        <motion.div
          className="app__flex"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ManageTrips;
