import React, { useState } from "react";

import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import "./Nav.scss";
import PlayerNav from "./PlayerNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [adminView, setAdminView] = useState(true);
  const admin = Auth.adminLogIn();
  const loggedIn = Auth.loggedIn();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="app__navbar">
      <ul className="app__navbar-links">
        <li className="app__flex p-text">
          <Link to={"/home"}>Home</Link>
        </li>
        {admin ? (
          <>
            {adminView ? (
              <li className="app__flex p-text">
                <Link to={"/administrationhome"}>Admin Home</Link>
              </li>
            ) : (
              <PlayerNav />
            )}
          </>
        ) : (
          <li className="app__flex p-text">
            <Link to={"/administration"}>Admin Login</Link>
          </li>
        )}
        {!admin && loggedIn && <PlayerNav />}
        {loggedIn ? (
          <li className="app__flex p-text">
            <a href="/" onClick={logout}>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li className="app__flex p-text">
              <Link to={"/login"}>Players Login</Link>
            </li>
          </>
        )}
        {admin && (
          <>
            {adminView ? (
              <li
                onClick={() => setAdminView(false)}
                className="app__flex p-text"
              >
                Player View
              </li>
            ) : (
              <li
                onClick={() => setAdminView(true)}
                className="app__flex p-text"
              >
                Admin View
              </li>
            )}
          </>
        )}
      </ul>

      <MobileNav
        admin={admin}
        adminView={adminView}
        setAdminView={setAdminView}
        logout={logout}
        loggedIn={loggedIn}
      />
    </nav>
  );
};

export default Navbar;
