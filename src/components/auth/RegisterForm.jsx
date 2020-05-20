import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

const RegisterForm = () => (
  <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
    <div
      className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
    >
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Sign Up
      </h2>
      In Development...
    </div>
  </div>
);

RegisterForm.propTypes = {
  ...ReactRouterPropTypes,
};

export default RegisterForm;
