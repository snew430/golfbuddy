import React from 'react';
import './Modal.scss';

const ConfirmModal = ({
  exitFunction,
  neededExitVars,
  purposeFunction,
  text,
  neededVars,
}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{text}</h3>
        <button
          onClick={() => {
            purposeFunction(neededVars);
          }}
        >
          Confirm
        </button>
        <button onClick={() => exitFunction(neededExitVars)}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
