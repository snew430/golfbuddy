import React from "react";
import "./Home.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home">
      <h2 className="head-text-home">
        What's My Tee Time? <br /> Golf Trips
      </h2>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
        className="app__flex"
      >
        <Link to="../SignUp">
          <button>Sign Up for the Next Trip</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
