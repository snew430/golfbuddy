import React from "react";
import "./Tournament.scss";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_TOURNAMENTS, QUERY_PLAYERS } from "../../utils/queries";

const Tournament = () => {
  //const { data: basicTourney } = useQuery(QUERY_BASIC_TOURNAMENTS);
  const { data: tournamentData } = useQuery(QUERY_TOURNAMENTS);
  const { data: playerData } = useQuery(QUERY_PLAYERS);

  const tournament = tournamentData?.tournaments[0] || []; 
  const players = playerData?.players || [];

  //console.log(basicTourney);
  console.log(tournament);
  console.log('players:', players);

  return (
    <div id="tournament">
      <div className="background">
        <h2 className="head-text">{tournament.name}</h2>
        <h3>{tournament.startDate} - {tournament.endDate}</h3>

        <div className="app__flex">
          <Link to="../SignUp">
            <button>Sign Up for this Tournament</button>
          </Link>
        </div>

        <div className="trip-details">
          <div>
            {/* <h4>We are staying at <br/> {tournament.hotels[0].name}</h4>
            <p>{tournament.hotels[0].address}</p>
            <a href="{hotel.website}">{tournament.hotels[0].website}</a> */}
            <p>Price for Single Room: ${tournament.singlePrice}</p>
            <p>Price for Double Room: ${tournament.doublePrice}</p>
            <p>Golf Only Price: ${tournament.golfOnlyPrice}</p>
          </div>
          <div>
            <h4>Courses</h4>
            <p>Day One: </p>
            <p>Day Two: </p>
            <p>Day Three: </p>
            <p>Day Four: </p>
          </div>
        </div>

        <h4>All payments are due: {tournament.paymentDue} </h4>

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

        <p className="info-text">
          We are looking forward to a great trip, and hope you will join us!
        </p>

        {/* <div className="app__flex">
          <Link to="../Administration">
            <button className="administrator">Administrator</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Tournament;
