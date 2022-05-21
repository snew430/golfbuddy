import React from "react";
import "./Admin-Home.scss";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const AdminHome = () => {
  const loggedIn = Auth.loggedIn();

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
    </div>
  );
};

export default AdminHome;
