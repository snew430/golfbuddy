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
          <label htmlFor="name">Max Players:</label>
          <input type="text" value={trip.maxPlayers} />
          <br />
          <label htmlFor="name">Payment Due:</label>
          <input type="text" value={trip.paymentDue} />
          <br />
          <button>Change Trip Info</button>
          <label htmlFor="name">Hotel Name:</label>
          <input type="text" value={trip.hotel.name} />
          <br />
          <label htmlFor="name">Hotel Address:</label>
          <input type="text" value={trip.hotel.address} />
          <br />
          <label htmlFor="name">Hotel Website:</label>
          <input type="text" value={trip.hotel.website} />
          <br />
          <button>Change Hotel Info</button>
          {trip.courses.map((course) => (
            <>
              <label htmlFor="name">Course Name:</label>
              <input type="text" value={course.name} />
              <br />
              <label htmlFor="name">Course Address:</label>
              <input type="text" value={course.address} />
              <br />
              <label htmlFor="name">Course Website:</label>
              <input type="text" value={course.website} />
              <br />
              <label htmlFor="name">Course Tee Time:</label>
              <input type="text" value={course.teeTime} />
              <br />
              <button>Change Course Info</button>
            </>
          ))}
        </form>
      </div>
    </div>
  );
};

export default EditTrip;
