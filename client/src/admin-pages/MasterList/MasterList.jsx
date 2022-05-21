import React from "react";
import "./MasterList.scss";
import Master from '../../components/Master/Master';
import { useQuery, useMutation } from "@apollo/react-hooks";

import { QUERY_PLAYERS } from "../../utils/queries";
import Auth from "../../utils/auth";

const MasterList = () => {
  const { data: playerData } = useQuery(QUERY_PLAYERS);

  const players = playerData?.players || [];

  console.log(players);

  const loggedIn = Auth.loggedIn();

  return (
    <div id="masterList">
      <div className="background">
        <h2 className="head-text">Master List</h2>
        <div className="master-list">
          <Master 
            players={players}
          />
        </div>
      </div>
    </div>
  );
};

export default MasterList;