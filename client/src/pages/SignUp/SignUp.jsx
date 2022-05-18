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
    <div id="signUp">
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
    <div className='app__signUp-form'>
     
          <input type='text' placeholder='First Name' name='firstName' value={name} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Last Name' name='lastName' value={name} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='email' name='email' value={email} onChange={handleChangeInput} />
      

     
      <div className='button_list'>
        <button type='button' >{'Single'}</button>
        <button type='button' >{'Double'}</button>
        <button type='button' >{'Golf Only'}</button>
      </div>
        
     

      <button type='button' onClick={handleSubmit}>{loading ? 'Signing Up' : 'Sign Up'}</button>
    </div>
    : 
    <div>
      <h3 className='head-text'>See You On The Course!</h3>
    </div>
    }
    </div>
  );
}

export default SignUp;