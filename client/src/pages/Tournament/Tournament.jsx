import React from 'react';
import './Tournament.scss';
import { Link } from "react-router-dom";

const Tournament = () => {
  return (
    <div id='tournament'>
      <div className='background'>

        <h2>Trip Name</h2>
        <h3>Dates</h3>

        <div className='app__flex'>
          <Link to='../SignUp'><button>Sign Up for this Trip</button></Link> 
        </div>

        <div className='trip-details'>
          <div className='accomodations'>
            <h4>We are staying at HOTEL</h4>
            <a href="">link to hotel website</a>
              <p>Price for Single Room: </p>
              <p>Price for Double Room: </p>
              <p>Golf Only Price: </p>
          </div>
          <div className='course-details'>
              <p>Day One Course: </p>
              <p>Day Two Course: </p>
              <p>Day Three Course: </p>
              <p>Day Four Course: </p>
          </div>
        </div>

        <h5>All payments are due: DUEDATE </h5>
          <p>Please send payments to</p>

      </div>

      <div className='app_flex'>
        <Link to='../Administration'><button>Administrator</button></Link> 
      </div>
      
    </div>
  );
}

export default Tournament;