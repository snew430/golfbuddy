import React, {useState} from 'react';
import './Home.scss';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';
import ryderCupRules from '../../assets/ryder-cup-rules.pdf';
import ryderCupGroups from '../../assets/RyderSpring2023.pdf';
import montues4somes from '../../assets/4somesSpring.pdf';
// import { Document, Page, pdfjs } from 'react-pdf';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';

const Home = () => {
  const loggedIn = Auth.loggedIn();

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  return (
    <div id="home">
      <h2 className="head-text-home">
        What's My Tee Time? <br /> Golf Trips
      </h2>
      <motion.div
        whileInView={{opacity: [0, 1]}}
        transition={{duration: 0.7}}
        whileHover={{scale: 1.1}}
        className="app__flex"
      >
        {loggedIn ? (
          <div className="buttons">
            <Link to="../trip">
              <button>Trip Information</button>
            </Link>
          </div>
        ) : (
          <>
            <Link to="../login">
              <button>Log In to Sign Up for the Next Trip</button>
            </Link>
          </>
        )}
      </motion.div>
      <motion.div
        whileInView={{opacity: [0, 1]}}
        transition={{duration: 0.7}}
        whileHover={{scale: 1.1}}
        className="app__flex"
      >
        <a href={ryderCupRules} target="_blank" rel="noreferrer">
          <button>Ryder Cup Rules</button>
        </a>
      </motion.div>
      <motion.div
        whileInView={{opacity: [0, 1]}}
        transition={{duration: 0.7}}
        whileHover={{scale: 1.1}}
        className="app__flex"
      >
        <a href={ryderCupGroups} target="_blank" rel="noreferrer">
          <button>Ryder Cup Groups</button>
        </a>
      </motion.div>
      <motion.div
        whileInView={{opacity: [0, 1]}}
        transition={{duration: 0.7}}
        whileHover={{scale: 1.1}}
        className="app__flex"
      >
        <a href={montues4somes} target="_blank" rel="noreferrer">
          <button>Sunday 4-Somes</button>
        </a>
      </motion.div>
    </div>
  );
};

export default Home;
