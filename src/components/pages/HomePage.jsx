import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import Nav from 'components/nav/Nav';

const HomePage = ({ match }) => {
  useEffect(() => {
    document.body.classList.add('home');
    return () => {
      document.body.classList.remove('home');
    };
  }, []);

  return (
    <Nav match={match} />
  );
};

HomePage.propTypes = {
  ...ReactRouterPropTypes,
};

export default HomePage;
