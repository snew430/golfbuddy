import React from 'react';
import {Link} from 'react-router-dom';

const AdminMobileNav = ({setToggle}) => {
  return (
    <>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={'/administrationhome'}>
          Admin Home
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={'/playerlist'}>
          Player List
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={'/masterlist'}>
          Master List
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={'/message'}>
          Email
        </Link>
      </li>
      <li className="app__flex p-text">
        <Link onClick={() => setToggle(false)} to={'/managetrips'}>
          Trip Manager
        </Link>
      </li>
    </>
  );
};

export default AdminMobileNav;
