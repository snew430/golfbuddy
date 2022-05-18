import React from 'react';
import './Tournament.scss';

const Tournament = () => {
  return (
    <div id='tournament'>
      <h2>Trip Name</h2>
      <h3>Dates</h3>

      <div className='app__flex'>
        <button>Sign Up for this Trip</button>
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

        <p>All payments are due: DUEDATE < br/>
          Please send payments to 
        </p>

      </div>

    </div>
  );
}

export default Tournament;