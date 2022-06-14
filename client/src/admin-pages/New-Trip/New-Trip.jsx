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
    paymentDue: "",
    maxPlayers: 0,
    singlePrice: 0,
    doublePrice: 0,
    golfOnlyPrice: 0,
    hotelName: "",
    hotelAddress: "",
    hotelWebsite: "",
    hotelPhoneNumber: "",
    courseOneName: "",
    courseOneAddress: "",
    courseOneWebsite: "",
    courseOnePhoneNumber: "",
    courseTwoName: "",
    courseTwoAddress: "",
    courseTwoWebsite: "",
    courseTwoPhoneNumber: "",
    courseThreeName: "",
    courseThreeAddress: "",
    courseThreeWebsite: "",
    courseThreePhoneNumber: "",
    courseFourName: "",
    courseFourAddress: "",
    courseFourWebsite: "",
    courseFourPhoneNumber: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addTrip] = useMutation(ADD_TRIP);

  console.log(formData);
  let input = false;

  const {
    name,
    startDate,
    endDate,
    paymentDue,
    maxPlayers,
    singlePrice,
    doublePrice,
    golfOnlyPrice,
    hotelName,
    hotelAddress,
    hotelWebsite,
    hotelPhoneNumber,
    courseOneName,
    courseOneAddress,
    courseOneWebsite,
    courseOnePhoneNumber,
    courseTwoName,
    courseTwoAddress,
    courseTwoWebsite,
    courseTwoPhoneNumber,
    courseThreeName,
    courseThreeAddress,
    courseThreeWebsite,
    courseThreePhoneNumber,
    courseFourName,
    courseFourAddress,
    courseFourWebsite,
    courseFourPhoneNumber,
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
    if (
      name === "maxPlayers" ||
      name === "singlePrice" ||
      name === "doublePrice" ||
      name === "golfOnlyPrice"
    ) {
      setformData({ ...formData, [name]: parseInt(value) });
    } else {
      setformData({ ...formData, [name]: value });
    }
    for (let data in formData) {
      console.log(data);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    ///////////////////////////////add Trip specifications from Trip query

    try {
      addTrip({
        variables: {
          name,
          startDate,
          endDate,
          maxPlayers,
          paymentDue,
          singlePrice,
          doublePrice,
          golfOnlyPrice,
          hotelName,
          hotelAddress,
          hotelWebsite,
          hotelPhoneNumber,
          courseOneName,
          courseOneAddress,
          courseOneWebsite,
          courseOnePhoneNumber,
          courseTwoName,
          courseTwoAddress,
          courseTwoWebsite,
          courseTwoPhoneNumber,
          courseThreeName,
          courseThreeAddress,
          courseThreeWebsite,
          courseThreePhoneNumber,
          courseFourName,
          courseFourAddress,
          courseFourWebsite,
          courseFourPhoneNumber,
        },
      });
    } catch (err) {
      console.error(err);
    }

    setformData({
      name: "",
      startDate: "",
      endDate: "",
      paymentDue: "",
      maxPlayers: 0,
      singlePrice: 0,
      doublePrice: 0,
      golfOnlyPrice: 0,
      hotelName: "",
      hotelAddress: "",
      hotelWebsite: "",
      hotelPhoneNumber: "",
      courseOneName: "",
      courseOneAddress: "",
      courseOneWebsite: "",
      courseOnePhoneNumber: "",
      courseTwoName: "",
      courseTwoAddress: "",
      courseTwoWebsite: "",
      courseTwoPhoneNumber: "",
      courseThreeName: "",
      courseThreeAddress: "",
      courseThreeWebsite: "",
      courseThreePhoneNumber: "",
      courseFourName: "",
      courseFourAddress: "",
      courseFourWebsite: "",
      courseFourPhoneNumber: "",
    });

    setIsFormSubmitted(true);
  };

  return (
    <div id="newTrip">
      <h2 className="head-text">Create New Trip</h2>

      {!isFormSubmitted ? (
        <div className="app__newTrip-form">
          <h2>Trip Information</h2>

          <div>
            <input
              type="text"
              placeholder="Trip Name"
              name="name"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Start Date"
              name="startDate"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="End Date"
              name="endDate"
              onChange={handleChangeInput}
            />

            <input
              type="text"
              placeholder="Maximum Number of Players"
              name="maxPlayers"
              onChange={handleChangeInput}
            />
          </div>

          <h2>Course One Information</h2>

          <div>
            <input
              type="text"
              placeholder="Course One"
              name="courseOneName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course One Address"
              name="courseOneAddress"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course One Website"
              name="courseOneWebsite"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course One Phone Number"
              name="courseOnePhoneNumber"
              onChange={handleChangeInput}
            />
          </div>

          <h2>Course Two Information</h2>

          <div>
            <input
              type="text"
              placeholder="Course Two"
              name="courseTwoName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Two Address"
              name="courseTwoAddress"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Two Website"
              name="courseTwoWebsite"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Two Phone Number"
              name="courseTwoPhoneNumber"
              onChange={handleChangeInput}
            />
          </div>

          <h2>Course Three Information</h2>

          <div>
            <input
              type="text"
              placeholder="Course Three"
              name="courseThreeName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Three Address"
              name="courseThreeAddress"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Three Website"
              name="courseThreeWebsite"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Three Phone Number"
              name="courseThreePhoneNumber"
              onChange={handleChangeInput}
            />
          </div>

          <h2>Course Four Information</h2>

          <div>
            <input
              type="text"
              placeholder="Course Four"
              name="courseFourName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Four Address"
              name="courseFourAddress"
              onChange={handleChangeInput}
            />
            <br />
            <input
              type="text"
              placeholder="Course Four Website"
              name="courseFourWebsite"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Course Four Phone Number"
              name="courseFourPhoneNumber"
              onChange={handleChangeInput}
            />
          </div>

          <h2>Hotel Information</h2>

          <div>
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

          <h2>Payment Information</h2>

          <div>
            <input
              type="text"
              placeholder="Payment Due Date"
              name="paymentDue"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Single Bed Payment Price"
              name="singlePrice"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Double Bed Payment Price"
              name="doublePrice"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Golf Only Price"
              name="golfOnlyPrice"
              onChange={handleChangeInput}
            />
          </div>

          <div className="app__flex">
            {input ? (
              <></>
            ) : (
              <button type="button" onClick={handleSubmit}>
                {loading ? "Creating Trip" : "Create Trip"}
              </button>
            )}
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
