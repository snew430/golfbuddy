import React, { useState} from 'react';
import './New-Tournament.scss';

const NewTournament = () => {

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


    ///////////////////////////////hold up
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
    <div id="newTournament">
    <h2 className='head-text'>Create New Tournament</h2>
    
    {!isFormSubmitted ? 
    <div className='app__newTournament-form'>
     
          <input type='text' placeholder='New Tournament Name' name='tournament' value={name} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Start Date' name='lastName' value={name} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='End Date' name='email' value={email} onChange={handleChangeInput} />



          <input type='text' placeholder='Course' name='course' value={name} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Hotel' name='hotel' value={name} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='Payment Due Date' name='payment' value={email} onChange={handleChangeInput} />

          <input type='text' placeholder='Single Bed Payment Price' name='single' value={name} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Double Bed Payment Price' name='double' value={name} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='Golf Only Price' name='golfOnly' value={email} onChange={handleChangeInput} />
      
        
     
    <div className='app__flex'>
      <button type='button' className='submitBtn' onClick={handleSubmit}>{loading ? 'Creating Tournament' : 'Create Tournament'}</button>
    </div>
    
    </div>
    : 
    <div>
      <h3 className='head-text'>See You On The Course!</h3>
    </div>
    }
    </div>
  );
}

export default NewTournament;