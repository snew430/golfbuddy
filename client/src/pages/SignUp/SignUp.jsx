import React, { useState } from 'react';

// import { images } from '../../constants';
// import { client } from '../../client';

import './SignUp.scss';

const SignUp = () => {
  const [formData, setformData] = useState({ name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name, email } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setformData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      firstName: name,
      lastName: name,
      email: email,
    }
    // client.create(contact)
    // .then(() => {
    //   setLoading(false);
    //   setIsFormSubmitted(true);
    // })
  }
  return (
    <>
    <h2 className='head-text'>Sign Up</h2>

    <div className='app__signUp-cards'>
        <div className='app__signUp-card'>
            {/* <img src={images.email} alt="email" /> */}
            <a href='mailto: ' className='p-text'>Club email address?????????????????</a>
        </div>
        <div className='app__signUp-card'>
            {/* <img src={images.mobile} alt="mobile" /> */}
            <a href='tel: +1 ' className='p-text'>Club Phone???????</a>
        </div>
    </div>

    
    {!isFormSubmitted ? 
    <div className='app__signUp-form app__flex'>
      <div className='app__flex'>
          <input className='p-text' type='text' placeholder='First Name' name='firstName' value={name} onChange={handleChangeInput} />
      </div>
      
      <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Last Name' name='lastName' value={name} onChange={handleChangeInput} />
      </div>

      <div className='app__flex'>
          <input className='p-text' type='email' placeholder='email' name='email' value={email} onChange={handleChangeInput} />
      </div>

      <div className='app__flex'>
      <div> Accomodations <br/>
        <button type='button' className='p-text'>{'Single'}</button>
        <button type='button' className='p-text'>{'Double'}</button>
        <button type='button' className='p-text'>{'Golf Only'}</button>
        </div>
      </div>

      <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Signing Up' : 'Sign Up'}</button>
    </div>
    : 
    <div>
      <h3 className='head-text'>See You On The Course!</h3>
    </div>
    }
    </>
  );
}

export default SignUp;