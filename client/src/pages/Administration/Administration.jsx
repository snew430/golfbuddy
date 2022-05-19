import React, { useState } from 'react';
import './Administration.scss';
import { useMutation } from '@apollo/react-hooks';

import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

const Administration = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      email: '',
      password: '',
    });
  };

  return (
    <div id='administration'>
      <h2 className='head-text'>If you are a website administrator, <br /> please use this page to login</h2>
          <div className='app__flex'>
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
                  <button>Login</button>
            </form>
          </div>
        {error && <div>Login failed</div>}
    </div>
  );
}

export default Administration;