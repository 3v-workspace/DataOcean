import React, { useState } from 'react';
import './login-page.scss';
import ReactRouterPropTypes from 'utils/react-router-prop-types';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={onSubmit}>
        <label>Email</label>
        <input
          type="email"
          onChange={({ target: { value } }) => setEmail(value)}
          name="email"
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          name="password"
          value={password}
        />
        <button type="submit">
          Вхід
        </button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default LoginPage;
