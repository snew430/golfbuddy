import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import './AdminNav.scss';

const AdminNav = () => {
    const [toggle, setToggle] = useState(false);
    const loggedIn = Auth.loggedIn();
  
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };

    return (
        <nav className="app__navbar">
       <ul className="app__navbar-links">
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
                  <li className="app__flex">
                    <Link to={"/administrationhome"}>Home</Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/masterlist"}>Master List</Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/playerlist"}>Tournament Player List</Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/message"}>Email the Players</Link>
                  </li>
                  <li className="app__flex">
                    <Link to={"/newtourney"}>Create New Tournament</Link>
                  </li>
                  <li className="app__flex">
                    <a href="/" onClick={logout}>
                      Logout
                    </a>
                  </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
    )
}

export default AdminNav;