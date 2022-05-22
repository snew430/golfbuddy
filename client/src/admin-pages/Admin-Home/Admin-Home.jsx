import React from "react";
import "./Admin-Home.scss";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const AdminHome = () => {
  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return (
      <div>
        You need to log in first. Dont cheat to look at something you're not
        supposed to. <br />
        Makes me think you cheat at golf too
      </div>
    );
  }

  return (
    <div id="adminHome">
      <h2 className="head-text-home">Hello Administrator</h2>
      <div className="app__flex">
        <Link to="../New-Tournament">
          <button>Create the Next Tournament</button>
        </Link>
      </div>
      <div className="app__flex">
        <Link to="../playerlist">
          <button>Player List</button>
        </Link>
      </div>
      <div className="app__flex">
        <Link to="../masterlist">
          <button>Master List</button>
        </Link>
      </div>
      <div className="app__flex">
        <Link to="../Message">
          <button>Email the Players</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;