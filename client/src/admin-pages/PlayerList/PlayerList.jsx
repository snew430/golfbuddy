import React, { useEffect } from "react";
import "./PlayerList.scss";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { QUERY_PLAYERS, QUERY_TOURNAMENT } from "../../utils/queries";

const PlayerList = () => {
  // const { data: playerData } = useQuery(QUERY_PLAYERS);
  const { data } = useQuery(QUERY_TOURNAMENT);

  // const players = playerData?.query.players || [];
  // const tournament = tournamentData?.tournament || [];

  // const { data } = useQuery(QUERY_TOURNAMENT);
  // const { data: players } = useQuery(QUERY_PLAYERS);
  // console.log(players);
  console.log(data);
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
