import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './Nav.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const admin = Auth.adminLogIn();
  const loggedIn = Auth.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    setToggle(false);
    Auth.logout();
  };

  return (
    <nav className="app__navbar">
      <ul className="app__navbar-links">
        <li className="app__flex p-text">
          <Link to={'/home'}>Home</Link>
        </li>{' '}
        {admin ? (
          <>
            <li className="app__flex p-text">
              <Link to={'/administrationhome'}>Admin Home</Link>
            </li>
          </>
        ) : (
          <>
            <li className="app__flex p-text">
              <Link to={'/administration'}>Admin Login</Link>
            </li>
          </>
        )}
        {loggedIn ? (
          <>
            <li className="app__flex p-text">
              <Link to={'/trip'}>Trip</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={'/announcement'}>Announcements</Link>
            </li>
            <li className="app__flex p-text">
              <Link to={'/rules'}>Rules</Link>
            </li>
          </>
        ) : (
          <>
            <li className="app__flex p-text">
              <Link to={'/login'}>Players Login</Link>
            </li>
          </>
        )}
        {admin || loggedIn ? (
          <>
            <li className="app__flex p-text">
              <a href="/" onClick={logout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4
          className="cursor-item"
          onClick={() => setToggle(!toggle)}
        />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX className="cursor-item" onClick={() => setToggle(false)} />
            <ul>
              <li className="app__flex p-text">
                <Link to={'/home'}>Home</Link>
              </li>{' '}
              {admin ? (
                <>
                  <li className="app__flex p-text">
                    <Link to={'/administrationhome'}>Admin Home</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={'/playerlist'}>Player List</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={'/masterlist'}>Master List</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={'/message'}>Email</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="app__flex p-text">
                    <Link to={'/administration'}>Admin Login</Link>
                  </li>
                </>
              )}
              {loggedIn ? (
                <>
                  <li className="app__flex p-text">
                    <Link to={'/trip'}>Trip</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={'/announcement'}>Announcement</Link>
                  </li>
                  <li className="app__flex p-text">
                    <Link to={'/rules'}>Rules</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="app__flex p-text">
                    <Link to={'/login'}>Players Login</Link>
                  </li>
                </>
              )}
              {admin || loggedIn ? (
                <>
                  <li className="app__flex p-text">
                    <a href="/" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
