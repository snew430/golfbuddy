import "./Home.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { monday4Somes, tuesday4Somes, sunday4Somes } from "../../assets/files";

const Home = () => {
  const loggedIn = Auth.loggedIn();

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
    </div>
  );
};

export default Home;
