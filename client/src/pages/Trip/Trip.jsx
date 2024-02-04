import React from 'react';
import './Trip.scss';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {QUERY_ACTIVE_TRIP} from '../../utils/queries';
import Auth from '../../utils/auth';
import {Cheat} from '../../components';

const Trip = () => {
  const {loading, data: tripData} = useQuery(QUERY_ACTIVE_TRIP);
  const trip = tripData?.activeTrip || {};
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) {
    return <Cheat />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const startTimes = [
    trip.dayOneStart,
    trip.dayTwoStart,
    trip.dayThreeStart,
    trip.dayFourStart,
  ];

  return (
    <div id="trip">
      <div className="background">
        <h2 className="head-text">{trip.name}</h2>
        <h3>
          {trip.startDate} - {trip.endDate}
        </h3>

        <motion.div className="app__flex" whileHover={{scale: 1.1}}>
          <Link to="../SignUp">
            <button>Sign Up for this Trip</button>
          </Link>
        </motion.div>

        <motion.div
          className="trip-details"
          whileInView={{opacity: [0, 1]}}
          transition={{duration: 0.7}}
        >
          <div>
            <h4>Hotel</h4>
            <h5>
              The Grand Grand Grand Hotel of the asesome state of maryland
            </h5>
            <p className="p-text">{trip.hotel.address}</p>
            <p className="p-text">
              <a
                className="p-text link"
                href={trip.hotel.website}
                rel="noreferrer"
                target="_blank"
              >
                You can see the hotel website here
              </a>
            </p>
            <p className="p-text">
              <a
                className="p-text"
                href={`tel:${trip.hotel.phoneNumber}`}
                rel="noreferrer"
              >
                Phone Number: {trip.hotel.phoneNumber}
              </a>
            </p>
            <p className="p-text">Price for Single Room: ${trip.singlePrice}</p>
            <p className="p-text">Price for Double Room: ${trip.doublePrice}</p>
            <p className="p-text">Golf Only Price: ${trip.golfOnlyPrice}</p>
          </div>
          <div>
            <h4>Courses</h4>
            {trip.courses.map((course, i) => (
              <p className="p-text" key={course.i}>
                Day {i + 1} <br />
                <a
                  className="p-text link"
                  href={course.website}
                  rel="noreferrer"
                  target="_blank"
                >
                  {course.name}
                </a>
                <p className="p-text">{course.address}</p>
                <p className="p-text">Start Time: {startTimes[i]}</p>
                <br />
                <a
                  className="p-text"
                  href={`tel:${course.phoneNumber}`}
                  rel="noreferrer"
                >
                  Phone Number: {course.phoneNumber}
                </a>
              </p>
            ))}
          </div>
        </motion.div>

        <h3>Current Roster</h3>

        <div className="roster-list">
          <div>
            {trip.playersActive.map((player) => (
              <p className="p-text less">
                {player.firstName} {player.lastName}
              </p>
            ))}
          </div>
        </div>
        <div className="padding-bottom"></div>
      </div>
    </div>
  );
};

export default Trip;
