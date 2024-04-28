import React from "react";
import { Link } from "react-router-dom";

const PlayerMobileNav = ({ setToggle }) => {
  return (
    <>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={"/trip"}>
          Trip
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={"/announcement"}>
          Announcement
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={"/rules"}>
          Rules
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={"/media"}>
          Media
        </Link>
      </li>
    </>
  );
};

export default PlayerMobileNav;
