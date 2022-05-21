import React from "react";
import "./Tournament.scss";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_BASIC_TOURNAMENT, QUERY_TOURNAMENT } from "../../utils/queries";

const Tournament = () => {
  const { data: basicTourney } = useQuery(QUERY_BASIC_TOURNAMENT);
  const { data: tournamentData } = useQuery(QUERY_TOURNAMENT);

  console.log(basicTourney);
  console.log(tournamentData);

  return (
    <div id="tournament">
      <div className="background">
        <h2>Trip Name</h2>
        <h3>Dates</h3>

        <div className="app__flex">
          <Link to="../SignUp">
            <button>Sign Up for this Trip</button>
          </Link>
        </div>

        <div className="trip-details">
          <div>
            {/* <h4>We are staying at {hotel.name}</h4>
            <p>{hotel.address}</p>
            <a href="{hotel.website}">{hotel.website}</a>
            <p>Price for Single Room: ${hotel.singlePrice}</p>
            <p>Price for Double Room: ${hotel.doublePrice}</p>
            <p>Golf Only Price: ${hotel.golfOnlyPrice}</p> */}
          </div>
          <div>
            <h4>Courses</h4>
            <p>Day One Course: </p>
            <p>Day Two Course: </p>
            <p>Day Three Course: </p>
            <p>Day Four Course: </p>
          </div>
        </div>

        <h4>All payments are due: DUEDATE </h4>

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

        <p>
          We are looking forward to a great trip, and hope you will join us!
        </p>

        <div className="app__flex">
          <Link to="../Administration">
            <button className="administrator">Administrator</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
