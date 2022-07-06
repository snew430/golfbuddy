import React, { useState } from "react";
import "./SignUp.scss";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_TRIPS } from "../../utils/queries";
import { ADD_ACTIVE_PLAYER, ADD_WAITLIST_PLAYER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignUp = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preferredRoomate: "",
    lodging: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { data: basicTourney } = useQuery(QUERY_TRIPS);
  const [addPlayer] = useMutation(ADD_ACTIVE_PLAYER);
  const [addWaitlistPlayer] = useMutation(ADD_WAITLIST_PLAYER);

  const trip = basicTourney?.trips[0] || [];

  const { activePlayerCount, maxPlayers } = trip;

  const { firstName, lastName, email, phoneNumber, preferredRoomate, lodging } =
    formData;

    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
      return (
        <div>
          You need to log in first. Don't cheat by looking at something you're
          not supposed to. <br />
          Makes me think you cheat at golf too
        </div>
      );
    }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (status) => {
    const tripId = trip._id;
    if (status === "active") {
      try {
        addPlayer({
          variables: {
            tripId,
            firstName,
            lastName,
            email,
            phoneNumber,
            preferredRoomate,
            lodging,
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        addWaitlistPlayer({
          variables: {
            tripId,
            firstName,
            lastName,
            email,
            phoneNumber,
            preferredRoomate,
            lodging,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    setformData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      preferredRoomate: "",
      lodging: "",
    });
    // Need to remove from local storage
    setIsFormSubmitted(true);
  };

  return (
    <div id="signUp">
      <h2 className="head-text">Sign Up for</h2>
      <h2 className="trip-text"> {trip.name} </h2>
      <h4 className="date-text">
        {trip.startDate} - {trip.endDate}
      </h4>

      {!isFormSubmitted ? (
        <div className="app__signUp-form">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChangeInput}
          />

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChangeInput}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />

          <input
            type="phone"
            placeholder="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChangeInput}
          />

          <h2 className="accommodation">Accommodation Options</h2>

          <div className="button_list">
            <button
              name="lodging"
              type="button"
              className={lodging === "Single" ? "active" : "inactive"}
              onClick={handleChangeInput}
              value="Single"
            >
              Single ${trip.singlePrice}
            </button>
            <button
              name="lodging"
              type="button"
              className={lodging === "Double" ? "active" : "inactive"}
              onClick={handleChangeInput}
              value="Double"
            >
              Double ${trip.doublePrice}
            </button>
            <button
              name="lodging"
              type="button"
              className={lodging === "Golf Only" ? "active" : "inactive"}
              onClick={handleChangeInput}
              value="Golf Only"
            >
              Golf Only ${trip.golfOnlyPrice}
            </button>
          </div>

          {lodging === "Double" ? (
            <>
              <h4 className="info-text">Do you have a preferred roomate?</h4>

              <input
                type="preferredRoomate"
                placeholder="Roomate Name"
                name="preferredRoomate"
                value={preferredRoomate}
                onChange={handleChangeInput}
              />
            </>
          ) : (
            ""
          )}

          <h5 className="date-text">
            All payments are due: {trip.paymentDue}{" "}
          </h5>

          <p className="info-text">
            Please send payments through Venmo <a href="https://account.venmo.com/u/John-McKenna-145">
            @John-McKenna-145
          </a> or mail a check
            to
            <br /> John McKenna, 7278 Pebble Creek Drive, Elkridge, MD 21075
          </p>

          <p className="info-text">
            The cost of the tirp includes: <br />
            Accomodations, Green Fees, Hotel Breakfast, and Prize Money
          </p>

          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.7 }}
          >
            {activePlayerCount < maxPlayers && (
              <button
                type="button"
                className="submitBtn"
                onClick={() => handleSubmit("active")}
              >
                Sign Up for the Trip
              </button>
            )}
            <button
              type="button"
              className="submitBtn"
              onClick={() => handleSubmit("waitlist")}
            >
              Join the Waitlist
            </button>
          </motion.div>
        </div>
      ) : (
        <div>
          <h3 className="head-text">See You On The Course!</h3>
        </div>
      )}
    </div>
  );
};

export default SignUp;
