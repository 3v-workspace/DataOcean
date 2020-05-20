import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'logo.svg';
import './ReactLogo.scss';


const ReactLogo = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Data ocean</h1>
      <Link to="/login/">
        <h3>Login</h3>
      </Link>
    </header>
  </div>
);

ReactLogo.propTypes = {};

export default ReactLogo;
