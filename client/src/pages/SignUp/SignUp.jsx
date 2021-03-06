import React, { useState } from "react";
import "./SignUp.scss";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_TRIPS } from "../../utils/queries";
import {
  ADD_ACTIVE_PLAYER,
  ADD_WAITLIST_PLAYER,
  SEND_MESSAGE,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import Refunds from "../../assets/2022_Spring_Refund.xls";

const SignUp = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preferredRoomate: "",
    lodging: "",
  });
  const [signupMessage, setSignupMessage] = useState(
    "You are signed up. See you on the course!"
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);

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
      <div className="cheat-container">
        <h3 className="cheat-text">
          You need to log in first. Don't cheat by looking at something you're
          not supposed to. <br />
          Makes me think you cheat at golf too
        </h3>
      </div>
    );
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (status) => {
    const tripId = trip._id;
    const [recipients, subject, message] = [
      email,
      "Welcome to the Trip!",
      "You're signed up for the fall trip. Your money is due August 1 to secure your spot.",
    ];
    if (status === "active") {
      try {
        await sendMessage({
          variables: {
            recipients,
            subject,
            message,
          },
        });
        await addPlayer({
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
        setSignupMessage("You are now on the waitlist");
        await sendMessage({
          variables: {
            recipients,
            subject,
            message,
          },
        });
        console.log(
          tripId,
          firstName,
          lastName,
          email,
          phoneNumber,
          preferredRoomate,
          lodging
        );
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
            Please send payments through Venmo
            <a href="https://account.venmo.com/u/John-McKenna-145">
              @John-McKenna-145
            </a>
            or mail a check to
            <br />
            John McKenna, 7278 Pebble Creek Drive, Elkridge, MD 21075
          </p>

          <p className="info-text">
            Money received after due date is subject to $25 late fee.
          </p>

          <p className="info-text">
            The cost of the trip includes: <br />
            Accomodations, Green Fees, and Prize Money.
          </p>

          <p className="info-text">
            Disclaimer: You may be entitled to a refund from last trip
            <br /> Please check document below
          </p>

          <a
            className="app__flex"
            href={Refunds}
            target="blank"
            rel="noopener noreferrer"
          >
            <button className="refundBtn">Refunds</button>
          </a>

          <p className="info-text">
            If you cancel at any time after payment for a trip, you may be
            subject to a termination fee.
            <br />
            We will do our best to return your money, but returns are subject to
            course and hotel cancelation fees.
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
          <h3 className="head-text">{signupMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default SignUp;
