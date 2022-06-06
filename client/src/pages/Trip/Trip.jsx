import React from "react";
import "./Trip.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TRIPS } from "../../utils/queries";

const Trip = () => {
  const { loading, data: tripData } = useQuery(QUERY_TRIPS);
  const trip = tripData?.trips[0] || [];

  console.log(trip);

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
            <h5>{trip.hotels[0].name}</h5>
            <p className="p-text">{trip.hotels[0].address}</p>
            <p className="p-text">
              <a
                className="p-text link"
                href={trip.hotels[0].website}
                rel="noreferrer"
                target="_blank"
              >
                {trip.hotels[0].website}
              </a>
            </p>
            <p className="p-text">
              <a
                className="p-text link"
                href={`tel:${trip.hotels[0].phoneNumber}`}
                rel="noreferrer"
              >
                Telephone :{trip.hotels[0].phoneNumber}
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
                Day {i + 1}: <br />
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
                  className="p-text link"
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
          Please send payments through Venmo @John-McKenna-145 or mail a check
          to
          <br /> John McKenna, 7278 Pebble Creek Drive, Elkridge, MD 21075
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
