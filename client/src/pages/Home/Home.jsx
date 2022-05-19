import React from 'react';
import './Home.scss';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id='home'>
        <h2 className='head-text-home'>Early Birdie Golf Trips</h2>
        <div className='app__flex'>
           <Link to='../SignUp'><button>Sign Up for the Next Trip</button></Link> 
        </div>
    </div>
  );
}

export default Home;