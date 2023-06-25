import {useState} from 'react';
import './Modal.scss';

const CourseHotelModal = ({exitFunction, neededExitVars, purposeFunction}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: '',
  });

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
        <label htmlFor="name">Name:</label>
        <input type="text" value={formData.name} />
        <br />
        <label htmlFor="name">Address:</label>
        <input type="text" value={formData.address} />
        <br />
        <label htmlFor="name">Website:</label>
        <input type="text" value={formData.website} />
        <br />
        <button onClick={handleModalSubmit}>Add</button>
        <button onClick={() => exitFunction(neededExitVars)}>Cancel</button>
      </div>
    </div>
  );
};

export default CourseHotelModal;
