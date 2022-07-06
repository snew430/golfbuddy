import React, { useState } from "react";
import "./Login.scss";
import { useMutation } from "@apollo/react-hooks";
import { motion } from "framer-motion";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const loggedIn = Auth.loggedIn();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  if (loggedIn) {
    window.location.assign("/trip");
  }

  return (
    <div id="login">
      <h2 className="head-text">Players Login</h2>
      {error && (
        <div className="app__flex">
          <p className="invalid-text">
            Invalid Credentials <br /> Please Try Again
          </p>
        </div>
      )}
      <motion.div
        className="app__flex"
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
      >
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="text"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
