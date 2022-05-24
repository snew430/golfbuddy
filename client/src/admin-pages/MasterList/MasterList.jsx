import React from "react";
import { Link } from "react-router-dom";
import "./MasterList.scss";
import Master from "../../components/Master/Master";
import { useQuery } from "@apollo/react-hooks";

import { QUERY_PLAYERS } from "../../utils/queries";
import Auth from "../../utils/auth";

const MasterList = () => {
  const { data: playerData } = useQuery(QUERY_PLAYERS);

  const players = playerData?.players || [];

  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return (
      <div>
        You need to log in first. Don't cheat by looking at something you're not
        supposed to. <br />
        Makes me think you cheat at golf too...
      </div>
    );
  }

  return (
    <div id="masterList">
      <div className="background">
        <h2 className="head-text">Master List</h2>
        <div className="master-list">
          <Master players={players} />
        </div>
        <div className="app__flex">
          <Link to="../Message">
            <button>Email the Players</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterList;