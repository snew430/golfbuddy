import React, {useState} from 'react';
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import PlayerMobileNav from './PlayerMobileNav';
import AdminMobileNav from './AdminMobileNav';
const MobileNav = ({admin, adminView, setAdminView, loggedIn, logout}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="app__navbar-menu">
      <HiMenuAlt4 className="cursor-item" onClick={() => setToggle(!toggle)} />
      {toggle && (
        <motion.div
          whileInView={{x: [300, 0]}}
          transition={{duration: 0.85, ease: 'easeOut'}}
        >
          <HiX className="cursor-item" onClick={() => setToggle(false)} />
          <ul>
            <li className="app__flex p-text">
              <Link onClick={() => setToggle(false)} to={'/home'}>
                Home
              </Link>
            </li>
            {admin ? (
              <>
                {adminView ? (
                  <AdminMobileNav {...setToggle} />
                ) : (
                  <PlayerMobileNav {...setToggle} />
                )}
              </>
            ) : (
              <li className="app__flex p-text">
                <Link onClick={() => setToggle(false)} to={'/administration'}>
                  Admin Login
                </Link>
              </li>
            )}
            {!admin && loggedIn ? (
              <PlayerMobileNav {...setToggle} />
            ) : (
              <>
                <li className="app__flex p-text">
                  <Link onClick={() => setToggle(false)} to={'/login'}>
                    Players Login
                  </Link>
                </li>
              </>
            )}
            {loggedIn && (
              <>
                <li className="app__flex p-text">
                  <Link to={'/'} onClick={logout}>
                    Logout
                  </Link>
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
        </motion.div>
      )}
    </div>
  );
};

export default MobileNav;
