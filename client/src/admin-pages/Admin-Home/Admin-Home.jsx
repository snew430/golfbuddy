import React from 'react';
import './Admin-Home.scss';
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div id='adminHome'>
        <h2 className='head-text-home'>Hello Administrator</h2>
        <div className='app__flex'>
           <Link to='../New-Tournament'><button>Create the Next Tournament</button></Link>
        </div> 
        <div className='app__flex'>
          <Link to='../PlayerList'><button>Player List</button></Link> 
        </div>
        <div className='app__flex'>
          <Link to='../MasterList'><button>Master List</button></Link> 
        </div>
    </div>
  );
}

export default AdminHome;