import React from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';


const ReactLogo = (props) => {
  const { text } = props;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{text}</h1>
      </header>
    </div>
  );
};

ReactLogo.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ReactLogo;
