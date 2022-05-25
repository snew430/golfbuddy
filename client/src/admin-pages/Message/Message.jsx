import React, { useState } from "react";
import "./Message.scss";
import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_PLAYERS, QUERY_ACTIVE_PLAYERS } from "../../utils/queries";
import { motion } from "framer-motion";
import { SEND_MESSAGE } from "../../utils/mutations";

const Message = () => {
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { loading: allPlayersLoading, data: emailMasterlist } =
    useQuery(QUERY_PLAYERS);
  const { loading: activePlayersLoading, data: emailPlayers } =
    useQuery(QUERY_ACTIVE_PLAYERS);

  const masterList = emailMasterlist?.players || [];
  const activeList = emailPlayers?.tournaments[0].playersActive || [];

  const { subject, message } = formData;
  const loggedIn = Auth.loggedIn();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendEmail = async (e) => {
    const { subject, message } = formData;

    let recipients = "";

    let list;

    if (e.target.name === "tournament") {
      list = activeList;
    } else {
      list = masterList;
    }
    list.forEach((player) => {
      recipients += `${player.email},`;
    });


    try {
      await sendMessage({
        variables: { recipients, subject, message },
      });
    } catch (err) {
      console.error(err);
    }
    setIsFormSubmitted(true);
  };

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
    return <div>Loading...</div>;
  }
  return (
    <div id="message">
      <div className="background">
        <h2 className="head-text">Email the Players</h2>
        {!isFormSubmitted ? (
          <motion.div className="app__flex"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}>
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
              <div className="email-body">
                <textarea
                  className="p-text"
                  placeholder="Your Message"
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                />
              </div>
              <button type="button" name="tournament" onClick={handleSendEmail}>
                Send to Tournament Players
              </button>
              <button type="button" name="master" onClick={handleSendEmail}>
                Send to Master List
              </button>
            </div>
          </motion.div>
        ) : (
          <div>
            <h2 className="head-text">Email Sent!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
