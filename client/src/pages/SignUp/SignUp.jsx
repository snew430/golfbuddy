import React, { useState } from "react";
import "./SignUp.scss";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_BASIC_TOURNAMENTS } from "../../utils/queries";
import { ADD_ACTIVE_PLAYER, ADD_WAITLIST_PLAYER } from "../../utils/mutations";

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

  const { data: basicTourney } = useQuery(QUERY_BASIC_TOURNAMENTS);
  const [addPlayer] = useMutation(ADD_ACTIVE_PLAYER);
  const [addWaitlistPlayer] = useMutation(ADD_WAITLIST_PLAYER);

  const tournament = basicTourney?.tournaments[0] || [];

  const { activePlayerCount, maxPlayers } = tournament;

  const { firstName, lastName, email, phoneNumber, preferredRoomate, lodging } =
    formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (status) => {
    console.log(status);
    const tournamentId = tournament._id;
    if (status === "active") {
      try {
        addPlayer({
          variables: {
            tournamentId,
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
            tournamentId,
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

  console.log(activePlayerCount, maxPlayers);
  return (
    <div id="signUp">
      <h2 className="head-text">Sign Up for</h2>
      <h2 className="tournament-text"> {tournament.name} </h2>
      <h4 className="date-text">{tournament.startDate} - {tournament.endDate}</h4>

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
              onClick={handleChangeInput}
              value="Single"
            >
              Single ${tournament.singlePrice}
            </button>
            <button
              name="lodging"
              type="button"
              onClick={handleChangeInput}
              value="Double"
            >
              Double ${tournament.doublePrice}
            </button>
            <button
              name="lodging"
              type="button"
              onClick={handleChangeInput}
              value="Golf Only"
            >
              Golf Only ${tournament.golfOnlyPrice}
            </button>
          </div>

          {lodging === "Double" ? (
            <>
              <h3>Do you have a preferred roomate?</h3>

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

          <h5 className="date-text">All payments are due: {tournament.paymentDue} </h5>  

          <p className="info-text">
          Please send payments through Venmo @John-McKenna-145 or mail a check
          to
          <br /> John McKenna, 7278 Pebble Creek Drive, Elkridge, MD 21075
          </p>

          <div>
            {activePlayerCount < maxPlayers && (
              <button
                type="button"
                className="submitBtn"
                onClick={() => handleSubmit("active")}
              >
                Sign Up for Tournament
              </button>
            )}
            <button
              type="button"
              className="submitBtn"
              onClick={() => handleSubmit("waitlist")}
            >
              Join the Waitlist
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

export default SignUp;