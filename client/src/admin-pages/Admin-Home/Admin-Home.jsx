import React from 'react';
import './Admin-Home.scss';
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';
import {motion} from 'framer-motion';
import {Cheat} from '../../components';

const AdminHome = () => {
  const loggedIn = Auth.adminLogIn();

  if (!loggedIn) {
    return <Cheat />;
  }

  return (
    <div id="adminHome">
      <h2 className="head-text-home">Hello Administrator</h2>
      <motion.div
        className="flex-wrap"
        whileInView={{opacity: [0, 1]}}
        transition={{duration: 0.8}}
      >
        <motion.div className="app__flex" whileHover={{scale: 1.1}}>
          <Link to="../New-Trip">
            <button>Create the Next Trip</button>
          </Link>
        </motion.div>
        <motion.div className="app__flex" whileHover={{scale: 1.1}}>
          <Link to="../playerlist">
            <button>Player List</button>
          </Link>
        </motion.div>
        <motion.div className="app__flex" whileHover={{scale: 1.1}}>
          <Link to="../masterlist">
            <button>Master List</button>
          </Link>
        </motion.div>
        <motion.div className="app__flex" whileHover={{scale: 1.1}}>
          <Link to="../managetrips">
            <button>Trip Manager</button>
          </Link>
        </motion.div>
        <motion.div className="app__flex" whileHover={{scale: 1.1}}>
          <Link to="../Message">
            <button>Email the Players</button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
