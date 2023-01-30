import React, {useState} from 'react';
import './New-Trip.scss';
import Auth from '../../utils/auth';
import {useMutation} from '@apollo/react-hooks';
import {ADD_TRIP} from '../../utils/mutations';
import {Cheat} from '../../components';

const NewTrip = () => {
  //edit form data to meet specifications from Trip query
  const [formData, setformData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    paymentDue: '',
    maxPlayers: 0,
    singlePrice: 0,
    doublePrice: 0,
    golfOnlyPrice: 0,
    hotelName: '',
    hotelAddress: '',
    hotelWebsite: '',
    hotelPhoneNumber: '',
    courseOneName: '',
    courseOneAddress: '',
    courseOneWebsite: '',
    courseOnePhoneNumber: '',
    courseTwoName: '',
    courseTwoAddress: '',
    courseTwoWebsite: '',
    courseTwoPhoneNumber: '',
    courseThreeName: '',
    courseThreeAddress: '',
    courseThreeWebsite: '',
    courseThreePhoneNumber: '',
    courseFourName: '',
    courseFourAddress: '',
    courseFourWebsite: '',
    courseFourPhoneNumber: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addTrip] = useMutation(ADD_TRIP);

  let input = false;

  // const {
  //   name,
  //   startDate,
  //   endDate,
  //   paymentDue,
  //   maxPlayers,
  //   singlePrice,
  //   doublePrice,
  //   golfOnlyPrice,
  //   hotelName,
  //   hotelAddress,
  //   hotelWebsite,
  //   hotelPhoneNumber,
  //   courseOneName,
  //   courseOneAddress,
  //   courseOneWebsite,
  //   courseOnePhoneNumber,
  //   courseTwoName,
  //   courseTwoAddress,
  //   courseTwoWebsite,
  //   courseTwoPhoneNumber,
  //   courseThreeName,
  //   courseThreeAddress,
  //   courseThreeWebsite,
  //   courseThreePhoneNumber,
  //   courseFourName,
  //   courseFourAddress,
  //   courseFourWebsite,
  //   courseFourPhoneNumber,
  // } = formData;

  const loggedIn = Auth.adminLogIn();

  if (!loggedIn) {
    return <Cheat />;
  }

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    if (
      name === 'maxPlayers' ||
      name === 'singlePrice' ||
      name === 'doublePrice' ||
      name === 'golfOnlyPrice'
    ) {
      setformData({...formData, [name]: parseInt(value)});
    } else {
      setformData({...formData, [name]: value});
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    ///////////////////////////////add Trip specifications from Trip query
    console.log(formData);
    const test = {
      name: 'test trip',
      startDate: '10/15/2023',
      endDate: '10/19/2023',
      paymentDue: '9/1/2023',
      maxPlayers: 45,
      singlePrice: 123,
      doublePrice: 234,
      golfOnlyPrice: 123,
      hotelName: 'hotel1',
      hotelAddress: '123 main street',
      hotelWebsite: 'hotel.com',
      hotelPhoneNumber: '123234345',
      courseOneName: 'course1',
      courseOneAddress: 'course1 adress',
      courseOneWebsite: 'course1.com',
      courseOnePhoneNumber: '123456789',
      courseOneTeeTime: '6am',
      courseTwoName: 'course2',
      courseTwoAddress: '432 main street',
      courseTwoWebsite: 'course2.com',
      courseTwoPhoneNumber: '123432654',
      courseTwoTeeTime: '8am',
      courseThreeName: 'course3',
      courseThreeAddress: '543 main street',
      courseThreeWebsite: 'course3.com',
      courseThreePhoneNumber: '1234325436',
      courseThreeTeeTime: '9am',
      courseFourName: 'course4',
      courseFourAddress: '654 main street',
      courseFourWebsite: 'course3.com',
      courseFourPhoneNumber: '5320982431',
      courseFourTeeTime: '9am',
    };
    try {
      addTrip({
        variables: test,
        // {
        //   name,
        //   startDate,
        //   endDate,
        //   maxPlayers,
        //   paymentDue,
        //   singlePrice,
        //   doublePrice,
        //   golfOnlyPrice,
        //   hotelName,
        //   hotelAddress,
        //   hotelWebsite,
        //   hotelPhoneNumber,
        //   courseOneName,
        //   courseOneAddress,
        //   courseOneWebsite,
        //   courseOnePhoneNumber,
        //   courseTwoName,
        //   courseTwoAddress,
        //   courseTwoWebsite,
        //   courseTwoPhoneNumber,
        //   courseThreeName,
        //   courseThreeAddress,
        //   courseThreeWebsite,
        //   courseThreePhoneNumber,
        //   courseFourName,
        //   courseFourAddress,
        //   courseFourWebsite,
        //   courseFourPhoneNumber,
        // },
      });
    } catch (err) {
      console.error(err);
    }

    setformData({
      name: '',
      startDate: '',
      endDate: '',
      paymentDue: '',
      maxPlayers: 0,
      singlePrice: 0,
      doublePrice: 0,
      golfOnlyPrice: 0,
      hotelName: '',
      hotelAddress: '',
      hotelWebsite: '',
      hotelPhoneNumber: '',
      courseOneName: '',
      courseOneAddress: '',
      courseOneWebsite: '',
      courseOnePhoneNumber: '',
      courseTwoName: '',
      courseTwoAddress: '',
      courseTwoWebsite: '',
      courseTwoPhoneNumber: '',
      courseThreeName: '',
      courseThreeAddress: '',
      courseThreeWebsite: '',
      courseThreePhoneNumber: '',
      courseFourName: '',
      courseFourAddress: '',
      courseFourWebsite: '',
      courseFourPhoneNumber: '',
    });

    setIsFormSubmitted(true);
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
                placeholder="Tee Time"
                name="courseOneTeeTime"
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
                placeholder="Tee Time"
                name="courseTwoTeeTime"
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
                placeholder="Tee Time"
                name="courseThreeTeeTime"
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
                placeholder="Tee Time"
                name="courseFourTeeTime"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Course Address"
                name="courseFourAddress"
                onChange={handleChangeInput}
              />
              <br />
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

            <div className="app__flex">
              {input ? (
                <></>
              ) : (
                <button type="button" onClick={handleSubmit}>
                  {loading ? 'Creating Trip' : 'Create Trip'}
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
    </div>
  );
};

export default NewTrip;
