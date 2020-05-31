import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown } from 'react-feather';
import PropTypes from 'prop-types';

// todo: add slideUp/slideDown animation
const NavDropdown = ({ item, children, pathname }) => {
  const [isOpen, setOpened] = useState(false);
  const [isActive, setActivated] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    if (pathname.search(item.path) === 0) {
      setActivated(true);
    } else if (isActive) {
      setActivated(false);
    }
  }, [pathname, item.path, isActive]);
  return (
    <li>
      <a
        href="#?"
        className={`side-menu ${isOpen && 'side-menu--open'} ${isActive && 'side-menu--active'}`}
        onClick={() => {
          setOpened(!isOpen);
        }}
      >
        <div className="side-menu__icon">
          {item.icon || <Activity />}
        </div>
        <div className="side-menu__title">{item.title}
          <ChevronDown className={`side-menu__sub-icon ${isOpen && 'transform rotate-180'}`} />
        </div>
      </a>
      <ul className={isOpen && 'side-menu__sub-open'}>{children}</ul>
    </li>
  );
};

NavDropdown.propTypes = {
  item: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default NavDropdown;
