import React, { useState} from 'react';
import './New-Tournament.scss';
import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_TOURNAMENT } from "../../utils/queries";
import { ADD_TOURNAMENT } from "../../utils/mutations";


const NewTournament = () => {
//edit form data to meet specifications from tournament query
  const [formData, setformData] = useState({ 
      name: '',
      startDate: '',
      endDate: '',
      course: '',
      hotel: '',
      maxPlayers: '',
      payment: '',
      single: '',
      double: '',
      golfOnly: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: newTournament } = useQuery(QUERY_TOURNAMENT);
  const [addTournament] = useMutation(ADD_TOURNAMENT);

  const tournament = newTournament?.tournaments[0] || [];

  console.log(newTournament);

  const { 
    name, 
    startDate, 
    endDate, 
    // course, 
    // hotel, 
    paymentDue,
    maxPlayers,
    singlePrice, 
    doublePrice, 
    golfOnlyPrice 
  } = formData;

  const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
      return (
        <div>
          You need to log in first. Dont cheat to look at something you're not
          supposed to. <br />
          Makes me think you cheat at golf too
        </div>
      );
    }


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);


    ///////////////////////////////add tournament specifications from tournament query
    const {
      name: name,
      startDate: startDate,
      endDate: endDate,
      // course: course,
      // hotel: hotel,
      paymentDue: payment, 
      maxPlayers: maxPlayers,
      singlePrice: single,
      doublePrice: double,
      golfOnlyPrice: golfOnly
    } = formData;

    try {
      addTournament({
        variables: {
          name,
          startDate,
          endDate,
          // course,
          // hotel,
          maxPlayers,
          paymentDue,
          singlePrice,
          doublePrice,
          golfOnlyPrice
        },
      });
    } catch (err) {
      console.log(err);
    }

    setformData({
      name: '',
      startDate: '',
      endDate: '',
      // course: '',
      // hotel: '',
      maxPlayers: '',
      paymentDue: '',
      singlePrice: '',
      doublePrice: '',
      golfOnlyPrice: ''
    })
  };


  return (
    <div id="newTournament">
    <h2 className='head-text'>Create New Tournament</h2>
    
    {!isFormSubmitted ? 
    <div className='app__newTourmament-form'>
     
          <input 
          type='text' 
          placeholder='New Tournament Name' 
          name='name' 
          value={name} 
          onChange={handleChangeInput} 
          />
      
      
      
          <input 
          type='text' 
          placeholder='Start Date' 
          name='startDate' 
          value={startDate} 
          onChange={handleChangeInput} 
          />
      

      
          <input 
          type='email' 
          placeholder='End Date' 
          name='endDate' 
          value={endDate} 
          onChange={handleChangeInput} 
          />



          {/* <input 
          type='text' 
          placeholder='Course' 
          name='course' 
          value={course} 
          onChange={handleChangeInput} 
          />
      
      
      
          <input 
          type='text' 
          placeholder='Hotel' 
          name='hotel' 
          value={hotel} 
          onChange={handleChangeInput} 
          /> */}
      

      
          <input 
          type='text' 
          placeholder='Payment Due Date' 
          name='paymentPrice' 
          value={paymentDue} 
          onChange={handleChangeInput} 
          />

        <input 
          type='text' 
          placeholder='Maximum Players' 
          name='maxPlayers' 
          value={maxPlayers} 
          onChange={handleChangeInput} 
          />

          <input 
          type='text' 
          placeholder='Single Bed Payment Price' 
          name='singlePrice' 
          value={singlePrice} 
          onChange={handleChangeInput} 
          />
      
      
      
          <input 
          type='text' 
          placeholder='Double Bed Payment Price' 
          name='doublePrice' 
          value={doublePrice} 
          onChange={handleChangeInput} 
          />
      

      
          <input 
          type='email' 
          placeholder='Golf Only Price' 
          name='golfOnlyPrice' 
          value={golfOnlyPrice} 
          onChange={handleChangeInput} 
          />
      
        
     
    <div className='app__flex'>
      <button 
      type='button' 
      className='submitBtn' 
      onClick={handleSubmit}>
        {loading ? 'Creating Tournament' : 'Create Tournament'}
        </button>
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