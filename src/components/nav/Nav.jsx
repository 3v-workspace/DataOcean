import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'react-feather';
import whiteLogo from 'images/whitelogo.png';
// import whiteLogo from 'images/w';

export const NavContext = React.createContext(false);

const Nav = (props) => {
  const { children, isMobile } = props;
  const [isOpen, setOpen] = useState(false);
  const [isAnimDisabled, disableAnim] = useState(false);
  const itemsListRef = useRef();

  const toggleMobile = () => {
    const $ul = $(itemsListRef.current);
    if (!isOpen) {
      $ul.slideDown();
    } else {
      $ul.slideUp();
    }
    setOpen(!isOpen);
  };

  if (isMobile) {
    return (
      <div className="mobile-menu md:hidden">
        <div className="mobile-menu-bar">
          <Link to="/system/" className="flex mr-auto">
            <img alt="Data Ocean" className="w-8 -mt-2" src={whiteLogo} />
          </Link>
          <a href="#?" id="mobile-menu-toggler" onClick={toggleMobile}>
            <BarChart2 className="w-8 h-8 text-white transform -rotate-90" />
          </a>
        </div>
        <ul
          ref={itemsListRef}
          className="border-t border-theme-24 py-5 hidden"
        >
          <NavContext.Provider value={{ isMobile, isOpen, toggleMobile }}>
            {children}
          </NavContext.Provider>
        </ul>
      </div>
    );
  }
  return (
    <nav className={`side-nav ${isAnimDisabled ? 'no-animation' : ''}`}>
      <Link to="/" className="intro-x flex items-center pl-5 pt-4">
        <img alt="Data Ocean" className="w-8 -mt-2" src={whiteLogo} />
        <span className="hidden xl:block text-white font-medium text-lg ml-3">Data Ocean</span>
      </Link>
      <div className="side-nav__devider my-6" />
      <ul onClick={() => !isAnimDisabled && disableAnim(true)}>
        <NavContext.Provider value={{ isMobile, isOpen, toggleMobile }}>
          {children}
        </NavContext.Provider>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  isMobile: PropTypes.bool,
};
Nav.defaultProps = {
  isMobile: false,
};

export default Nav;
