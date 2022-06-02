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
    setToggle(false);
    Auth.logout();
  };

  return (
    <nav className="app__navbar">
      <ul className="app__navbar-links">
        {loggedIn ? (
          <>
            <li className="app__flex p-text">
              <Link to={"/administrationhome"}>Home</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/playerlist"}>Player List</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/masterlist"}>Master List</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={"/message"}>Email</Link>
            </li>
            <li className="app__flex p-text">
              <a href="/" onClick={logout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            {["home", "trip", "rules"].map((item) => (
              <li className="app__flex p-text" key={`link-${item}`}>
                <Link to={`/${item}`}>{item}</Link>
              </li>
            ))}
            <li className="app__flex p-text">
              <Link to={"/administration"}>Admin Login</Link>
            </li>
          </>
        )}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(!toggle)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {loggedIn ? (
                <>
                  <li className="app__flex">
                    <Link
                      to={"/administrationhome"}
                      onClick={() => setToggle(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/masterlist"} onClick={() => setToggle(false)}>
                      Master List
                    </Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/playerlist"} onClick={() => setToggle(false)}>
                      Trip Player List
                    </Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/message"} onClick={() => setToggle(false)}>
                      Email the Players
                    </Link>
                  </li>
                  <li className="app__flex">
                    <Link
                      to={"/new-trip"}
                      onClick={() => setToggle(false)}
                    >
                      Create New Trip
                    </Link>
                  </li>
                  <li className="app__flex">
                    <a href="/" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  {["home", "trip", "rules"].map((item) => (
                    <li className="app__flex p-text" key={`link-${item}`}>
                      <Link to={`/${item}`} onClick={() => setToggle(false)}>
                        {item}
                      </Link>
                    </li>
                  ))}
                  <li className="app__flex p-text">
                    <Link
                      to={"/administration"}
                      onClick={() => setToggle(false)}
                    >
                      Admin Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
