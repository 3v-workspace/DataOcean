import React, { useState } from 'react';
import { Activity, ChevronDown } from 'react-feather';
import PropTypes from 'prop-types';

const NavDropdown = ({ item, children }) => {
  const [isOpen, setOpened] = useState(false);
  return (
    <li>
      <a
        href="#?"
        className={`side-menu ${isOpen && 'side-menu--open'}`}
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
};

export default NavDropdown;
