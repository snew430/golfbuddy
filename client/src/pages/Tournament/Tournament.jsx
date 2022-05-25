import React from "react";
import "./Tournament.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TOURNAMENTS } from "../../utils/queries";

const Tournament = () => {
  const { loading, data: tournamentData } = useQuery(QUERY_TOURNAMENTS);
  const tournament = tournamentData?.tournaments[0] || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="tournament">
      <div className="background">
        <h2 className="head-text">{tournament.name}</h2>
        <h3>
          {tournament.startDate} - {tournament.endDate}
        </h3>

        <div className="app__flex">
          <Link to="../SignUp">
            <button>Sign Up for this Tournament</button>
          </Link>
        </div>


        
        <div className="trip-details">
          <div>
            <h4>
              We are staying at <br /> {tournament.hotels[0].name}
            </h4>
            <p className="p-text">{tournament.hotels[0].address}</p>
            <p className="p-text">
              <a
                className="p-text"
                href={tournament.hotels[0].website}
                rel="noreferrer"
                target="_blank"
              >
                {tournament.hotels[0].website}
              </a>
            </p>
            <p className="p-text">
              Price for Single Room: ${tournament.singlePrice}
            </p>
            <p className="p-text">
              Price for Double Room: ${tournament.doublePrice}
            </p>
            <p className="p-text">
              Golf Only Price: ${tournament.golfOnlyPrice}
            </p>
          </div>
          <div>
            <h4>Courses</h4>
            <p className="p-text">
              Day One: <br />{" "}
              <a
                className="p-text"
                href={tournament.courses[0].website}
                rel="noreferrer"
                target="_blank"
              >
                {tournament.courses[0].name}
              </a>
            </p>
            <p className="p-text">
              Day Two: <br />{" "}
              <a
                className="p-text"
                href={tournament.courses[1].website}
                rel="noreferrer"
                target="_blank"
              >
                {tournament.courses[1].name}
              </a>
            </p>
            <p className="p-text">
              Day Three: <br />{" "}
              <a
                className="p-text"
                href={tournament.courses[2].website}
                rel="noreferrer"
                target="_blank"
              >
                {tournament.courses[2].name}
              </a>
            </p>
            <p className="p-text">
              Day Four: <br />{" "}
              <a className="p-text" href={tournament.courses[0].website}>
                {tournament.courses[0].name}
              </a>
            </p>
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
      </div>
    </div>
  );
};

export default Tournament;
