import React, { useState } from "react";
import "./Message.scss";
// const nodemailer = require("nodemailer");
import Auth from "../../utils/auth";

const Message = () => {
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { subject, message } = formData;
  const loggedIn = Auth.loggedIn();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSendTourneyPlayers = () => {
  //   setLoading(true);

  // };

  // const handleSendMasterList = () => {
  //   setLoading(true);

  // };

  if (!loggedIn) {
    return (
      <div>
        You need to log in first. Don't cheat by looking at something you're not
        supposed to. <br />
        Makes me think you cheat at golf too
      </div>
    );
  }

  return (
    <div id="message">
      <div className="background">
        <h2 className="head-text">Write an Email to the Players</h2>
        {!isFormSubmitted ? (
          <div className="app__flex">
            <div className="app__flex email-form">
              <div className="app__flex">
                <input
                  className="p-text"
                  type="email"
                  placeholder="Subject"
                  name="subject"
                  value={subject}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <textarea
                  className="p-text"
                  placeholder="Your Message"
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                />
              </div>
              <button 
                type="button"
                // onClick={handleSendTourneyPlayers}
              >
                {!loading ? "Send Message to Tournament Players" : "Sending..."}
              </button>
              <button 
                type="button"
                // onClick={handleSendMasterList}
              >
                {!loading ? "Send Message to Master List" : "Sending..."}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3>Email Sent!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
