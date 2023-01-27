import React from 'react';
import {Link} from 'react-router-dom';
import './ManageTrips.scss';
import List from '../../components/List/TripList';
import {motion} from 'framer-motion';
import {useQuery, useMutation} from '@apollo/react-hooks';

// import { exportCSVplayer, exportCSVwaitlist } from "../../utils/exportCSV";

import {QUERY_BASIC_TRIPS} from '../../utils/queries';
import {MAKE_TRIP_ACTIVE, DELETE_TRIP} from '../../utils/mutations';

import Auth from '../../utils/auth';

const ManageTrips = () => {
  const {data: tripData, refetch} = useQuery(QUERY_BASIC_TRIPS);
  const [makeActive] = useMutation(MAKE_TRIP_ACTIVE);
  const [deleteTrip] = useMutation(DELETE_TRIP);

  const trips = tripData?.trips || [];

  const loggedIn = Auth.loggedIn();

  const handleActiveClick = async (changeTripToActiveId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await makeActive({
        variables: {changeTripToActiveId},
      });
      refetch();
    } catch (err) {
      console.error(err);
    }

    refetch();
  };

  const handleDeleteTrip = async (id) => {
    try {
      await deleteTrip({
        variables: {deleteTripId: id},
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
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
          <div key={trip._id} className={`head-text ${trip.active ? "active-trip" : ""}`}>
            <h2>{trip.name}</h2>
            <div>
              {trip.startDate} - {trip.endDate}
            </div>
            <div>Players: {trip.activePlayerCount}</div>
            <div>{trip.active ? 'Active Trip' : ''}</div>
            {!trip.active && (
              <button onClick={() => handleActiveClick(trip._id)}>
                Make Active
              </button>
            )}
          </div>
        ))}

        <motion.div
          className="app__flex"
          whileInView={{opacity: [0, 1]}}
          transition={{duration: 0.7}}
        ></motion.div>
      </div>
    </div>
  );
};

export default ManageTrips;
