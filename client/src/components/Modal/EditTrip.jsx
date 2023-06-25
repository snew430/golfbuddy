import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {EDIT_TRIP} from '../../utils/mutations';
import './Modal.scss';

const EditTrip = ({trip, setModalShow, refetch}) => {
  const [editTrip] = useMutation(EDIT_TRIP);
  const [formData, setFormData] = useState(trip);
  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    if (
      name === 'maxPlayers' ||
      name === 'singlePrice' ||
      name === 'doublePrice' ||
      name === 'golfOnlyPrice'
    ) {
      const parsedVal = parseInt(value);
      setFormData({...formData, [name]: parsedVal});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  function handleFormSubmit() {
    const {
      _id,
      name,
      startDate,
      endDate,
      paymentDue,
      maxPlayers,
      singlePrice,
      doublePrice,
      golfOnlyPrice,
      dayOneStart,
      dayTwoStart,
      dayThreeStart,
      dayFourStart,
    } = formData;
    try {
      editTrip({
        variables: {
          editTripId: _id,
          name,
          startDate,
          endDate,
          paymentDue,
          maxPlayers,
          singlePrice,
          doublePrice,
          golfOnlyPrice,
          dayOneStart,
          dayTwoStart,
          dayThreeStart,
          dayFourStart,
        },
      });
      setModalShow(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h1
          onClick={() => {
            setModalShow(false);
          }}
        >
          X
        </h1>
        <form action="" className="modalForm">
          <h2>Trip Info:</h2>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChangeInput}
          />
          <label htmlFor="startDate">Start Date:</label>
          <input
            name="startDate"
            type="text"
            value={formData.startDate}
            onChange={handleChangeInput}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            name="endDate"
            type="text"
            value={trip.endDate}
            onChange={handleChangeInput}
          />
          <label htmlFor="doublePriceDate">Doubles Price:</label>
          <input
            name="doublePriceDate"
            type="text"
            value={trip.doublePrice}
            onChange={handleChangeInput}
          />
          <label htmlFor="singlePrice">Singles Price:</label>
          <input
            name="singlePrice"
            type="text"
            value={trip.singlePrice}
            onChange={handleChangeInput}
          />
          <label htmlFor="golfOnlyPrice">Golf Only Price:</label>
          <input
            name="golfOnlyPrice"
            type="text"
            value={trip.golfOnlyPrice}
            onChange={handleChangeInput}
          />
          <label htmlFor="maxPlayers">Max Players:</label>
          <input
            name="maxPlayers"
            type="text"
            value={trip.maxPlayers}
            onChange={handleChangeInput}
          />
          <label htmlFor="dayOneStart">Payment Due:</label>
          <input
            name="dayOneStart"
            type="text"
            value={trip.paymentDue}
            onChange={handleChangeInput}
          />
          <label htmlFor="startDate">Day 1 Start Time:</label>
          <input
            name="startDate"
            type="text"
            value={trip.dayOneStart}
            onChange={handleChangeInput}
          />
          <label htmlFor="dayTwoStart">Day 2 Start Time:</label>
          <input
            name="dayTwoStart"
            type="text"
            value={trip.dayTwoStart}
            onChange={handleChangeInput}
          />
          <label htmlFor="dayThreeStart">Day 3 Start Time:</label>
          <input
            name="dayThreeStart"
            type="text"
            value={trip.dayThreeStart}
            onChange={handleChangeInput}
          />
          <label htmlFor="dayFourStart">Day 4 Start Time:</label>
          <input
            name="dayFourStart"
            type="text"
            value={trip.dayFourStart}
            onChange={handleChangeInput}
          />
          <button onClick={handleFormSubmit}>Change Trip Info</button>
        </form>
      </div>
    </div>
  );
};

export default EditTrip;
