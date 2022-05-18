import React from 'react';
import './Administration.scss';

const Administration = () => {
  return (
    <div id='administration'>
      <h2 className='head-text'>If you are a website administrator, <br /> please use this page to login</h2>
      <div className='app__flex'>
        <button>Login</button>
      </div>
    </div>
  );
}

export default Administration;