import React, { useState } from "react";
import "./New-Trip.scss";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRIP } from "../../utils/mutations";

const NewTrip = () => {
  //edit form data to meet specifications from Trip query
  const [formData, setformData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    courses: "",
    hotel: "",
    maxPlayers: "",
    paymentDue: "",
    singlePrice: "",
    doublePrice: "",
    golfOnlyPrice: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addTrip] = useMutation(ADD_TRIP);

  const {
    name,
    startDate,
    endDate,
    courses,
    hotel,
    paymentDue,
    maxPlayers,
    singlePrice,
    doublePrice,
    golfOnlyPrice,
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
  };

  const handleSubmit = () => {
    setLoading(true);

    ///////////////////////////////add Trip specifications from Trip query
    const {
      name,
      startDate,
      endDate,
      courses,
      hotel,
      paymentDue,
      maxPlayers,
      singlePrice,
      doublePrice,
      golfOnlyPrice,
    } = formData;

    try {
      addTrip({
        variables: {
          name,
          startDate,
          endDate,
          courses,
          hotel,
          maxPlayers,
          paymentDue,
          singlePrice,
          doublePrice,
          golfOnlyPrice,
        },
      });
    } catch (err) {
      console.error(err);
    }

    setformData({
      name: "",
      startDate: "",
      endDate: "",
      courses: "",
      hotel: "",
      maxPlayers: "",
      paymentDue: "",
      singlePrice: "",
      doublePrice: "",
      golfOnlyPrice: "",
    });

    setIsFormSubmitted(true);
  };

  return (
    <div id="newTrip">
      <h2 className="head-text">Create New Trip</h2>

      {!isFormSubmitted ? (
        <div className="app__newTourmament-form">
          <input
            type="text"
            placeholder="New Trip Name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Start Date"
            name="startDate"
            value={startDate}
            onChange={handleChangeInput}
          />

          <input
            type="email"
            placeholder="End Date"
            name="endDate"
            value={endDate}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Course"
            name="courses"
            value={courses}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Hotel"
            name="hotel"
            value={hotel}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Payment Due Date"
            name="paymentPrice"
            value={paymentDue}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Maximum Players"
            name="maxPlayers"
            value={maxPlayers}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Single Bed Payment Price"
            name="singlePrice"
            value={singlePrice}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Double Bed Payment Price"
            name="doublePrice"
            value={doublePrice}
            onChange={handleChangeInput}
          />

          <input
            type="email"
            placeholder="Golf Only Price"
            name="golfOnlyPrice"
            value={golfOnlyPrice}
            onChange={handleChangeInput}
          />

          <div className="app__flex">
            <button type="button" className="submitBtn" onClick={handleSubmit}>
              {loading ? "Creating Trip" : "Create Trip"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="head-text">See You On The Course!</h3>
        </div>
      )}
    </div>
  );
};

export default NewTrip;
