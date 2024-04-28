import React, { useState } from "react";
import "./New-Trip.scss";
import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_TRIP, ADD_COURSE, ADD_HOTEL } from "../../utils/mutations";
import { QUERY_HOTELS, QUERY_COURSES } from "../../utils/queries";
import { Cheat } from "../../components";
import CourseHotelModal from "../../components/Modal/CourseHotelModal";

const NewTrip = () => {
  //edit form data to meet specifications from Trip query
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    paymentDue: "",
    maxPlayers: 0,
    singlePrice: 0,
    doublePrice: 0,
    golfOnlyPrice: 0,
    hotel: "",
    courseOne: "",
    courseTwo: "",
    courseThree: "",
    courseFour: "",
    dayOneStart: "",
    dayTwoStart: "",
    dayThreeStart: "",
    dayFourStart: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTrip] = useMutation(ADD_TRIP);
  const [addCourse] = useMutation(ADD_COURSE);
  const [addHotel] = useMutation(ADD_HOTEL);
  const { data: courses, loading: courseLoading } = useQuery(QUERY_COURSES);
  const { data: hotels, loading: hotelLoading } = useQuery(QUERY_HOTELS);
  const [addFunction, setAddFunction] = useState();
  const [showModal, setShowModal] = useState(false);
  let input = false;

  const loggedIn = Auth.adminLogIn();

  if (!loggedIn) {
    return <Cheat />;
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (
      name === "maxPlayers" ||
      name === "singlePrice" ||
      name === "doublePrice" ||
      name === "golfOnlyPrice"
    ) {
      const parsedVal = parseInt(value) || 0;
      setFormData({ ...formData, [name]: parsedVal });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await addTrip({
        variables: formData,
      });

      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        paymentDue: "",
        maxPlayers: 0,
        singlePrice: 0,
        doublePrice: 0,
        golfOnlyPrice: 0,
        hotel: "",
        courseOne: "",
        courseTwo: "",
        courseThree: "",
        courseFour: "",
      });

      setIsFormSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="newTrip">
      <div className="background">
        <h2 className="head-text">Create the Next Trip</h2>
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
            <h2>Hotel</h2>
            <div>
              <label htmlFor="">
                <select
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleChangeInput}
                >
                  {!hotelLoading &&
                    hotels.hotels.map((hotel) => (
                      <option value={hotel._id} key={hotel._id}>
                        {hotel.name}, {hotel.address}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setAddFunction(addHotel);
                }}
              >
                Create New Hotel
              </button>
            </div>

            <h2>Day One Course</h2>

            <div>
              <label>
                <select
                  name="courseOne"
                  value={formData.courseOne}
                  onChange={handleChangeInput}
                >
                  {!courseLoading &&
                    courses.courses.map((course) => (
                      <option value={course._id} key={course._id}>
                        {course.name}, {course.address}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setAddFunction(addCourse);
                }}
              >
                Create New Course
              </button>
            </div>

            <h2>Day Two Course</h2>
            <div>
              <label>
                <select
                  name="courseTwo"
                  value={formData.courseOne}
                  onChange={handleChangeInput}
                >
                  {!courseLoading &&
                    courses.courses.map((course) => (
                      <option value={course._id} key={course._id}>
                        {course.name}, {course.address}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setAddFunction(addCourse);
                }}
              >
                Create New Course
              </button>
            </div>

            <h2>Day Three Course</h2>
            <div>
              <label>
                <select
                  name="courseThree"
                  value={formData.courseOne}
                  onChange={handleChangeInput}
                >
                  {!courseLoading &&
                    courses.courses.map((course) => (
                      <option value={course._id} key={course._id}>
                        {course.name}, {course.address}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setAddFunction(addCourse);
                }}
              >
                Create New Course
              </button>
            </div>

            <h2>Day Four Course</h2>

            <div>
              <label>
                <select
                  name="courseFour"
                  value={formData.courseOne}
                  onChange={handleChangeInput}
                >
                  {!courseLoading &&
                    courses.courses.map((course) => (
                      <option value={course._id} key={course._id}>
                        {course.name}, {course.address}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setAddFunction(addCourse);
                }}
              >
                Create New Course
              </button>
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
      {showModal && (
        <CourseHotelModal
          exitFunction={setShowModal}
          neededExitVars={false}
          purposeFunction={addFunction}
        />
      )}
    </div>
  );
};

export default NewTrip;
