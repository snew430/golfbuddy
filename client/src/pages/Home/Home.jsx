import React, { useState } from 'react';
import './Home.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import ryderCupRules from '../../assets/ryder-cup-rules.pdf';
// import { Document, Page, pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const Home = () => {
  const loggedIn = Auth.loggedIn();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div id="home">
      <h2 className="head-text-home">
        What's My Tee Time? <br /> Golf Trips
      </h2>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.1 }}
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
      <div className="pdfs">
        <a href={ryderCupRules}>
          <div className="page">
            <p>Rules</p>
            <Document
              file={ryderCupRules}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} height="150" />
            </Document>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
