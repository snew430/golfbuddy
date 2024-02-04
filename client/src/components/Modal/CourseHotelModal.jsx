import {useState} from 'react';
import './Modal.scss';

const CourseHotelModal = ({exitFunction, purposeFunction}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: '',
  });

  const handleModalChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleModalSubmit = () => {
    try {
      purposeFunction({variables: formData});
      setFormData({name: '', address: '', website: ''});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h1
          className="close"
          onClick={() => {
            exitFunction(false);
          }}
        >
          X
        </h1>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleModalChange}
        />
        <br />
        <label htmlFor="name">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleModalChange}
        />
        <br />
        <label htmlFor="name">Website:</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleModalChange}
        />
        <br />
        <button onClick={handleModalSubmit}>Add</button>
        <button onClick={() => exitFunction(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default CourseHotelModal;
