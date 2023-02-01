import React, {useState} from 'react';
import './ManageTrips.scss';
import {motion} from 'framer-motion';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {EditTrip, Cheat} from '../../components';

import {QUERY_BASIC_TRIPS} from '../../utils/queries';
import {MAKE_TRIP_ACTIVE, DELETE_TRIP} from '../../utils/mutations';

import Auth from '../../utils/auth';

const ManageTrips = () => {
  const {data: tripData, refetch} = useQuery(QUERY_BASIC_TRIPS);
  const [makeActive] = useMutation(MAKE_TRIP_ACTIVE);
  const [deleteTrip] = useMutation(DELETE_TRIP);
  const [currentTripEdit, setCurrentTripEdit] = useState();
  const [modalShow, setModalShow] = useState(false);

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

  const handleEditTrip = (trip) => {
    setCurrentTripEdit(trip);
    setModalShow(true);
  };

  if (!loggedIn) {
    return <Cheat />;
  }

  return (
    <div id="manageTrips">
      {modalShow && <EditTrip trip={currentTripEdit} setModalShow ={setModalShow}/>}
      <div className="background">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className={`head-text ${trip.active ? 'active-trip' : ''}`}
          >
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
            <button onClick={() => handleDeleteTrip(trip._id)}>
              Delete Trip
            </button>
            <button onClick={() => handleEditTrip(trip)}>Edit Trip</button>
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
