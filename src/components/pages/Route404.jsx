import React from 'react';
import Button from 'components/form-components/Button';
import { Redirect, Route } from 'react-router-dom';

export const Page404 = () => (
  <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
    <div className="-intro-x lg:mr-20">
      <img
        alt="Midone Tailwind HTML Admin Template"
        className="h-48 lg:h-auto"
        src="/images/error-illustration.svg"
      />
    </div>
    <div className="text-white mt-10 lg:mt-0">
      <div className="intro-x text-6xl font-medium">404</div>
      <div className="intro-x text-xl lg:text-3xl font-medium">Ой. Ця сторінка зникла.</div>
      <div className="intro-x text-lg mt-3">
        Можливо, ви помилилися при введенні адреси або сторінка перемістилася.
      </div>
      <Button
        size="lg"
        variant="outline-white"
        className="intro-x mt-10"
        link="/"
      >
        На головну
      </Button>
    </div>
  </div>
);

const Route404 = () => (
  <Route
    render={() => <Redirect to="/404/" />}
  />
);

export default Route404;
