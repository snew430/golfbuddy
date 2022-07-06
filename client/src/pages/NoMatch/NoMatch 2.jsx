import React from "react";
import "./NoMatch.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div id="noMatch">
      <h2 className="head-text-noMatch">
        FORE <br /> Looks Like Your Ball Went Out of Bounds
      </h2>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
        className="app__flex"
      >
        <Link to="../Home">
          <button>Return to Home</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NoMatch;