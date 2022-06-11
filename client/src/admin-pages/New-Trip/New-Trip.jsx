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
    hotels: "",
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
    hotels,
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
      hotels,
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
          hotels,
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
      hotels: "",
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
        <div className="app__newTrip-form">
            <div className="item">
              <h2>Basic Information</h2>
              <input
                type="text"
                placeholder="Trip Name"
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
                placeholder="Maximum Number of Players"
                name="maxPlayers"
                value={maxPlayers}
                onChange={handleChangeInput}
              />
            </div>

            <div className="item">
              <h2>Course One Information</h2>
              <input
                type="text"
                placeholder="Course Name"
                name="courseOneName"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Address"
                name="courseOneAddress"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Website"
                name="courseOneWebsite"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Phone Number"
                name="courseOnePhoneNumber"
                onChange={handleChangeInput}
              />
            </div>

            <div className="item">
              <h2>Course Two Information</h2>
              <input
                type="text"
                placeholder="Course Name"
                name="courseTwoName"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Address"
                name="courseTwoAddress"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Website"
                name="courseTwoWebsite"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Phone Number"
                name="courseTwoPhoneNumber"
                onChange={handleChangeInput}
              />
            </div>

            <div className="item">
              <h2>Course Three Information</h2>
              <input
                type="text"
                placeholder="Course Name"
                name="courseThreeName"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Address"
                name="courseThreeAddress"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Website"
                name="courseThreeWebsite"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Phone Number"
                name="courseThreePhoneNumber"
                onChange={handleChangeInput}
              />
            </div>

            <div className="item">
              <h2>Course Four Information</h2>
              <input
                type="text"
                placeholder="Course Name"
                name="courseFourName"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Address"
                name="courseFourAddress"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Website"
                name="courseFourWebsite"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Phone Number"
                name="courseFourPhoneNumber"
                onChange={handleChangeInput}
              />
            </div>



          <div className="item">
          <h2>Hotel Information</h2>
            <input
              type="text"
              placeholder="Hotel Name"
              name="hotelName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Hotel Address"
              name="hotelAddress"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Hotel Phone Number"
              name="hotelPhoneNumber"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Hotel Website"
              name="hotelWebsite"
              onChange={handleChangeInput}
            />
          </div>



          <div className="item">
            <h2>Payment Information</h2>
            <input
                type="text"
                placeholder="Payment Due Date"
                name="paymentPrice"
                value={paymentDue}
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
          </div>

          <div className="app__flex">
            <button type="button" onClick={handleSubmit}>
              {loading ? "Creating Trip" : "Create Trip"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="head-text">Trip Created!</h2>
        </div>
      )}
    </div>
  );
};

export default NewTrip;
