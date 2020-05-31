import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ children }) => (
  <nav className="side-nav">
    <Link to="/home/" className="intro-x flex items-center pl-5 pt-4">
      <img alt="Data Ocean Logo" className="w-6" src="/images/logo.svg" />
      <span className="hidden xl:block text-white font-medium text-lg ml-3 ">Data Ocean</span>
    </Link>
    <div className="side-nav__devider my-6" />
    <ul>
      {children}
    </ul>
  </nav>
);

export default Nav;
