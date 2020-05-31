import React, { useState } from 'react';
import { Activity, ChevronDown } from 'react-feather';
import PropTypes from 'prop-types';

// todo: add slideUp/slideDown animation
const NavDropdown = ({ item, children }) => {
  const [isOpen, setOpened] = useState(false);
  return (
    <li>
      <a
        href="#?"
        className="menu"
        onClick={() => {
          setOpened(!isOpen);
        }}
      >
        <div className="menu__icon">
          {item.icon || <Activity />}
        </div>
        <div className="menu__title">{item.title}
          <ChevronDown className={`menu__sub-icon ${isOpen && 'transform rotate-180'}`} />
        </div>
      </a>
      <ul className={isOpen && 'menu__sub-open'}>{children}</ul>
    </li>
  );
};

NavDropdown.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NavDropdown;
