import React from "react";
import "./Trip.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ACTIVE_TRIP } from "../../utils/queries";
import Auth from "../../utils/auth";

const Trip = () => {
  const { loading, data: tripData } = useQuery(QUERY_ACTIVE_TRIP);
  const trip = tripData?.activeTrip || [];

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="trip">
      <div className="background">
        <h2 className="head-text">{trip.name}</h2>
        <h3>
          {trip.startDate} - {trip.endDate}
        </h3>

        <motion.div className="app__flex" whileHover={{ scale: 1.1 }}>
          <Link to="../SignUp">
            <button>Sign Up for this Trip</button>
          </Link>
        </motion.div>

        <motion.div
          className="trip-details"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h4>Hotel</h4>
            <h5>{trip.hotel.name}</h5>
            <p className="p-text">{trip.hotel.address}</p>
            <p className="p-text">
              <a
                className="p-text link"
                href={trip.hotel.website}
                rel="noreferrer"
                target="_blank"
              >
                {trip.hotel.website}
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
              <p className="p-text" key={course._id}>
                Day {i + 1} <br />
                <p className="p-text">Start Time: {course.teeTime}</p>
                <a
                  className="p-text link"
                  href={course.website}
                  rel="noreferrer"
                  target="_blank"
                >
                  {course.name}
                </a>
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

        <h5>All payments are due: {trip.paymentDue} </h5>

        <p className="info-text">
          Please send payments through Venmo
          <br />
          <a href="https://account.venmo.com/u/John-McKenna-145">
            @John-McKenna-145
          </a>
          <br />
          or mail a check to
          <br /> John McKenna, 7278 Pebble Creek Drive, Elkridge, MD 21075
        </p>

        <p className="info-text">
          Money received after due date is subject to $25 late fee.
        </p>

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
    </div>
  );
};

export default Trip;
