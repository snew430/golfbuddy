import React, { useState } from 'react';
import './Message.scss';
// const nodemailer = require("nodemailer");

const Message = () => {
    const [formData, setFormData] = useState({ subject: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { subject, message } = formData;

    // const handleSubmit = () => {
    //     setLoading(true);
        
    //     let transporter = nodemailer.createTransport({
    //         service: "gmail",
    //         auth: {
    //           user: 'whatsmyteetime@gmail.com',
    //           pass: 'What$myt33time',
    //         },
    //       });
  
    //       let mailOptions = {
    //         from: 'whatsmyteetime@gmail.com',
    //         to: dbUserData.email,
    //         subject: formData.subject,
    //         text: formData.message,
    //       };
  
    //       transporter.sendMail(mailOptions, function (err, data) {
    //         if (err) {
    //           console.log("Error occured", err);
    //         } else {
    //           console.log("Email Sent");
    //         }
    //       });
    //     };

    return (
        <div id='message'>
            <div className='background'>
                <h2 className='head-text'>Write an Email to the Players</h2>
                {!isFormSubmitted ? (
                <div className='app__flex'>
                    <div className="app__flex email-form">
                        <div className="app__flex">
                            <input className="p-text" type="email" placeholder="Subject" name="email" value={subject} />
                        </div>
                        <div>
                            <textarea
                            className="p-text"
                            placeholder="Your Message"
                            value={message}
                            name="message"
                            />
                        </div>
                        <button type="button">{!loading ? 'Send Message' : 'Sending...'}</button>
                    </div>
                </div>
                        ) : (
                <div>
                <h3>
                    Email Sent!
                </h3>
                </div>
                        )}
            </div>
        </div>
    );
}

export default Message;