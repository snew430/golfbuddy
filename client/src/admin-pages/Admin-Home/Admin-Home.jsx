import React from 'react';
import './Admin-Home.scss';
import {Link } from "react-router-dom";

const Home = () => {
  return (
    <div id='admin-home'>
        <h2 className='head-text-home'>Hello Administrator</h2>
        <div className='app__flex'>
           <Link to='../New-Tournament'><button>Create The Next Tournament</button></Link> 
        </div>
    </div>
  );
}

export default Home;