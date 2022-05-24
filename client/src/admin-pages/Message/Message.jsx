import React, { useState } from "react";
import "./Message.scss";

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PLAYERS } from "../../utils/queries";
import { QUERY_ACTIVE_PLAYERS } from "../../utils/queries";
// import nodemailer from "nodemailer";


const Message = () => {
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loading: allPlayersLoading, data: emailMasterlist } = useQuery(QUERY_PLAYERS);
  const { loading: activePlayersLoading, data: emailPlayers } = useQuery(QUERY_ACTIVE_PLAYERS);
console.log(emailMasterlist);
console.log(emailPlayers);
  const masterList = emailMasterlist?.players || [];
  const activeList = emailPlayers?.playersActive || [];
console.log(activeList);
  console.log(masterList);
  const { subject, message } = formData;
  const loggedIn = Auth.loggedIn();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.EMAIL,
  //     pass: process.env.PASS,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
  //   }
  // });

  const handleSendTourneyPlayers = () => {
    setLoading(true);
    let activeEmails = activeList.email;
    let list = ""
    // activeEmails.forEach (email => {

    // })
  var msg = {
    recepients: activeList.email,
    subject: formData.subject, 
    message: formData.message,
  };
  }

  const handleSendMasterList = () => {
    setLoading(true);
    var msg = {
      recepients: masterList.email,
      subject: formData.subject, 
      message: formData.message,
  
  }};

  if (!loggedIn) {
    return (
      <div>
        You need to log in first. Don't cheat by looking at something you're not
        supposed to. <br />
        Makes me think you cheat at golf too
      </div>
    );
  }

  if (activePlayersLoading || allPlayersLoading) {
    return (
      <div>
        Loading...
        </div>
    )
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
                onClick={handleSendTourneyPlayers}
              >
                {!loading ? "Send Message to Tournament Players" : "Sending..."}
              </button>
              <button 
                type="button"
                onClick={handleSendMasterList}
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
