import React, { useState } from "react";
import "./Administration.scss";
import { useMutation } from "@apollo/react-hooks";

import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

const Administration = () => {
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
      console.log("LOGGED IN");
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
    window.location.assign("/administrationhome");
  }

  return (
    <div id="administration">
      <h2 className="head-text">
        If You are a Website Administrator, <br /> Please Use This Page to Login
      </h2>
      {error && 
        <div className="app__flex">
          <p className="invalid-text">Invalid Credentials <br /> Please Try Again</p>
        </div>}
      <div className="app__flex">
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Administrator Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            placeholder="Administrator Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Administration;
