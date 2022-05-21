import React, { useEffect } from "react";
import "./PlayerList.scss";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  QUERY_ACTIVE_PLAYERS,
  QUERY_WAITLIST_PLAYERS,
  QUERY_TOURNAMENTS,
} from "../../utils/queries";
import Auth from "../../utils/auth";

const PlayerList = () => {
  const { loading: loadTourney, data: tournamentData } =
    useQuery(QUERY_TOURNAMENTS);
  const { data: activePlayers } = useQuery(QUERY_ACTIVE_PLAYERS);
  const { data: waitlistPlayers } = useQuery(QUERY_WAITLIST_PLAYERS);
  const loggedIn = Auth.loggedIn();

  console.log(loadTourney);
  console.log(tournamentData);
  console.log(activePlayers);
  console.log(waitlistPlayers);
  return (
    <div id="playerList">
      <div className="background">
        {/* <h2 className="head-text">Players Going to {tournament.name}</h2> */}
        <div className="player-list">
          {/* <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Accomodations</th>
                <th>Roommate Preference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {players.firstName} {players.lastName}
                </td>
                <td>{players.email}</td>
                <td>{players.phoneNumber}</td>
                <td>{players.lodging}</td>
                <td>{players.preferredRoomate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="head-text">Waitlisted Players</h2>
        <div className="player-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Accomodations</th>
                <th>Roommate Preference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {players.firstName} {players.lastName}
                </td>
                <td>{players.email}</td>
                <td>{players.phoneNumber}</td>
                <td>{players.lodging}</td>
                <td>{players.preferredRoomate}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
