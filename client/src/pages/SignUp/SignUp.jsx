import React, { useState } from "react";
import "./SignUp.scss";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_BASIC_TOURNAMENTS } from "../../utils/queries";
import { ADD_ACTIVE_PLAYER } from "../../utils/mutations";

//add player and add player to tournament

// import { client } from '../../client';

const SignUp = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preferredRoomate: "",
    lodging: "",
  });
  // ???????????
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: basicTourney } = useQuery(QUERY_BASIC_TOURNAMENTS);
  const [addPlayer] = useMutation(ADD_ACTIVE_PLAYER);

  const tournament = basicTourney?.tournaments[0] || [];

  const { firstName, lastName, email, phoneNumber, preferredRoomate, lodging } =
    formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // ????????
    setLoading(true);

    const tournamentId = tournament._id;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      preferredRoomate,
      lodging,
    } = formData;

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
      <h2 className="head-text">Sign Up For</h2>
      <h2 className="tournament-text"> {tournament.name} </h2>
      {/* <h3 className="course-text"> At {tournament.course}</h3> */}
      <h4 className="date-text">
        {" "}
        From {tournament.startDate} To {tournament.endDate}
      </h4>

      <div className="app__signUp-cards">
        <div className="app__signUp-card">
          {/* <img src={images.email} alt="email" /> */}
          <a href="mailto: whatsmyteetime@gmail.com" className="signup-text">
            whatsmyteetime@gmail.com
          </a>
        </div>
        <div className="app__signUp-card">
          {/* <img src={images.mobile} alt="mobile" /> */}
          <a href="tel: +1 " className="signup-text">
            Club Phone???????
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__signUp-form">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChangeInput}
          />



          <h2 className="accommodation">Accommodations</h2>

          <div className="button_list">
            <button
              name="lodging"
              type="button"
              onClick={handleChangeInput}
              value="Single"
            >
              Single
            </button>
            <button
              name="lodging"
              type="button"
              onClick={handleChangeInput}
              value="Double"
            >
              Double
            </button>
            <button
              name="lodging"
              type="button"
              onClick={handleChangeInput}
              value="Golf Only"
            >
              {"Golf Only"}
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

          <div className="app__flex">
            <button type="button" className="submitBtn" onClick={handleSubmit}>
              {loading ? "Signing Up For Trip" : "Sign Up For Trip"}
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
