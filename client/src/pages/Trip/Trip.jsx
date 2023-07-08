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
            <h5>{trip.hotel.name}</h5>
            <p className="p-text">{trip.hotel.address}</p>
            <a
              className="p-text link"
              href={trip.hotel.website}
              rel="noreferrer"
              target="_blank"
            >
              <p className="p-text">{trip.hotel.website}</p>
            </a>
            <a
              className="p-text"
              href={`tel:${trip.hotel.phoneNumber}`}
              rel="noreferrer"
            >
              <p className="p-text">Phone Number: {trip.hotel.phoneNumber}</p>
            </a>
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

        <p className="info-text">
          If you cancel at any time after payment for a trip, you may be subject
          to a termination fee.
          <br />
          The fee will depend on whether the committee can find a replacement
          golfer, or if we can get money back from the hotel or courses that
          require payment several weeks in advance of the start of the trip. Any
          money that you have left after the termination fee can be applied to
          future trips.
        </p>

        <p className="info-text">
          We have a limited number of spaces for golfers. Preference will be
          given to those who made our last trip followed by a first come, first
          serve basis. Once we reach capacity, we will start a waitlist. We
          always have a few last-minute drops due to individual circumstances.
        </p>

        <p className="info-text last">
          We are looking forward to a great trip, and hope you will join us!
        </p>
      </div>
      <div>
        <h3>Current Roster</h3>
        <div className="roster-list">
          <div>
            <h4>On Trip</h4>
            {trip.playersActive.map((player) => (
              <p key={player._id}>
                {player.firstName} {player.lastName}
              </p>
            ))}
          </div>
          <div>
            <h4>Waitlisted</h4>
            {trip.playersWaitlist.map((player) => (
              <p key={player._id}>
                {player.firstName} {player.lastName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
