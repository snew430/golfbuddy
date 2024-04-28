import React from "react";
import { Link } from "react-router-dom";

const PlayerNav = () => {
  return (
    <>
      <li className="app__flex p-text">
        <Link to={"/trip"}>Trip</Link>
      </li>
      <li className="app__flex p-text">
        <Link to={"/announcement"}>Announcements</Link>
      </li>
      <li className="app__flex p-text">
        <Link to={"/rules"}>Rules</Link>
      </li>
      <li className="app__flex p-text">
        <Link to={"/media"}>Media</Link>
      </li>
    </>
  );
};

export default PlayerNav;
