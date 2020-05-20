import React from 'react';
import TextInput from 'components/form-components/TextInput';
import BooleanInput from 'components/form-components/BooleanInput';
import Button from 'components/form-components/Button';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

// TODO: finish LoginForm
const LoginForm = () => (
  <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
    <div
      className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
    >
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Sign In
      </h2>
      <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
        A few more clicks to sign in to your
        account. Manage all your e-commerce accounts in one place
      </div>
      <div className="intro-x mt-8">
        <TextInput
          type="email"
          className="intro-x login__input border-gray-300 block"
          size="lg"
          placeholder="Email"
        />
        <TextInput
          type="password"
          className="intro-x login__input border-gray-300 block mt-4"
          size="lg"
          placeholder="Password"
        />
      </div>
      <div className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
        <BooleanInput
          className="mr-auto"
          name="remember-me"
          label="Remember me"
        />
        <a href="#?">Forgot Password?</a>
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          className="xl:w-32 xl:mr-3"
          size="lg"
          width="w-full"
        >
          Login
        </Button>
        <Button
          className="xl:w-32 xl:mr-3"
          variant="secondary"
          size="lg"
          width="w-full"
          link="/auth/register/"
        >
          Sign up
        </Button>
      </div>
      <div className="intro-x mt-10 xl:mt-24 text-gray-700 text-center xl:text-left">
        By signin up, you agree to our
        <br />
        <a
          className="text-theme-1"
          href="#?"
        >
          Terms and Conditions
        </a>
        {' & '}
        <a className="text-theme-1" href="#?">
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
);

LoginForm.propTypes = {
  ...ReactRouterPropTypes,
};

export default LoginForm;
