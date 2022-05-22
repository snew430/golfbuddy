import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import "./Nav.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const loggedIn = Auth.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="app__navbar">
      <ul className="app__navbar-links">
        {["home", "tournament", "rules"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <Link to={`/${item}`}>{item}</Link>
          </li>
        ))}
        {loggedIn ? (
          <>
            <li className="app__flex p-text">
              <Link to={"/administrationhome"}>Admin Home</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/masterlist"}>Masterlist</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/playerlist"}>Tourney Player List</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/message"}>Send Messages</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/newtourney"}>Create New Tourney</Link>
            </li>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <li className="app__flex p-text">
            <Link to={"/administrationhome"}>Admin Login</Link>
          </li>
        )}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "tournament", "rules"].map((item) => (
                <li key={item}>
                  <Link to={`/${item}`}>{item}</Link>
                </li>
              ))}
              {loggedIn ? (
                <>
                  <li className="app__flex p-text">
                    <Link to={"/administrationhome"}>Admin Home</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={"/masterlist"}>Masterlist</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={"/playerlist"}>Tourney Player List</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={"/message"}>Send Messages</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={"/newtourney"}>Create New Tourney</Link>
                  </li>
                  <a href="/" onClick={logout}>
                    Logout
                  </a>
                </>
              ) : (
                <li className="app__flex p-text">
                  <Link to={"/administration"}>Admin Login</Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
