import React, { useState } from "react";
import "./SignUp.scss";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ACTIVE_TRIP } from "../../utils/queries";
import {
  ADD_ACTIVE_PLAYER,
  ADD_WAITLIST_PLAYER,
  SEND_MESSAGE,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Cheat } from "../../components";

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
    "You are signed up. See you on the course!",
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data } = useQuery(QUERY_ACTIVE_TRIP);
  const [addPlayer] = useMutation(ADD_ACTIVE_PLAYER);
  const [addWaitlistPlayer] = useMutation(ADD_WAITLIST_PLAYER);

  const trip = data?.activeTrip || [];

  const { activePlayerCount, maxPlayers } = trip;

  const { firstName, lastName, email, phoneNumber, preferredRoomate, lodging } =
    formData;

  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return <Cheat />;
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (status) => {
    const [recipients, subject, message] = [
      email,
      "Welcome to the Trip!",
      `Thanks for joining us on our next trip. Next time you log on to front page, you should see your name on the Roster section. Check the Announcement Tab for all trip updates. Remember that money is due to Mac. 
We look forward to seeing you again.`,
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
          variables: formData,
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
        addWaitlistPlayer({
          variables: formData,
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
      <h4 className="date-text">
        ONCE YOU COMPLETE THE FORM, PLEASE CLICK THE BUTTON THAT SAYS "Sign Up
        for the Trip". You will know that you are registered when you receive an
        email. If you do not receive an email, please reach out to Angelo.
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
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.7 }}
          >
            {activePlayerCount < maxPlayers ? (
              <button
                type="button"
                className="submitBtn"
                onClick={() => handleSubmit("active")}
              >
                Sign Up for the Trip
              </button>
            ) : (
              <button
                type="button"
                className="submitBtn"
                onClick={() => handleSubmit("waitlist")}
              >
                Join the Waitlist
              </button>
            )}
          </motion.div>
        </div>
      ) : (
        <div>
          <h3 className="head-text">{signupMessage}</h3>
        </div>
      )}
      <h5 className="date-text">All payments are due: {trip.paymentDue} </h5>

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
    </div>
  );
};

export default SignUp;
