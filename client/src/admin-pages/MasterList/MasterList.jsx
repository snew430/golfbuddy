import React from 'react';
import './MasterList.scss'

const MasterList = () => {
  return (
    <div id='masterList'>
        <div className='background'>
          <h2 className='head-text'>Master List</h2>
          <div className='master-list'>
              <h6>Name</h6>
              <h6>Email</h6>
              <h6>Phone</h6>
          </div>
        </div>
    </div>
  );
}

export default MasterList;