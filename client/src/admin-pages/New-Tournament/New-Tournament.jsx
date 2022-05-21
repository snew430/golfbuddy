import React, { useState} from 'react';
import './New-Tournament.scss';
import Auth from "../../utils/auth";


const NewTournament = () => {
//edit form data to meet specifications from tournament query
  const [formData, setformData] = useState({ 
    tournament: '',
      startDate: '',
      endDate: '',
      course: '',
      hotel: '',
      payment: '',
      single: '',
      double: '',
      golfOnly: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  //edit form data to meet specifications from query
  const { tournament, startDate, endDate, course, hotel, payment, single, double, golfOnly } = formData;

  const loggedIn = Auth.loggedIn();


  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setformData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);


    ///////////////////////////////add tournament specifications from tournament query
    const contact = {
      _type: 'contact',
      tournament: tournament,
      startDate: startDate,
      endDate: endDate,
      course: course,
      hotel: hotel,
      payment: payment,
      single: single,
      double: double,
      golfOnly: golfOnly
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
    <div className='app__newTourmament-form'>
     
          <input type='text' placeholder='New Tournament Name' name='tournament' value={tournament} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Start Date' name='startDate' value={startDate} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='End Date' name='endDate' value={endDate} onChange={handleChangeInput} />



          <input type='text' placeholder='Course' name='course' value={course} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Hotel' name='hotel' value={hotel} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='Payment Due Date' name='payment' value={payment} onChange={handleChangeInput} />

          <input type='text' placeholder='Single Bed Payment Price' name='single' value={single} onChange={handleChangeInput} />
      
      
      
          <input type='text' placeholder='Double Bed Payment Price' name='double' value={double} onChange={handleChangeInput} />
      

      
          <input type='email' placeholder='Golf Only Price' name='golfOnly' value={golfOnly} onChange={handleChangeInput} />
      
        
     
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