import React from 'react';
import './Modal.scss';

const EditTrip = ({trip, setModalShow}) => {
  console.log(trip);
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
        <form action="">
          <h2>Trip Info:</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" value={trip.name} />
          <br />
          <label htmlFor="name">Start Date:</label>
          <input type="text" value={trip.startDate} />
          <br />
          <label htmlFor="name">End Date:</label>
          <input type="text" value={trip.endDate} />
          <br />
          <label htmlFor="name">Doubles Price:</label>
          <input type="text" value={trip.doublePrice} />
          <br />
          <label htmlFor="name">Singles Price:</label>
          <input type="text" value={trip.singlePrice} />
          <br />
          <label htmlFor="name">Golf Only Price:</label>
          <input type="text" value={trip.golfOnlyPrice} />
          <br />
          <button>Change Trip</button>
        </form>
        
      </div>
    </div>
  );
};

export default EditTrip;
