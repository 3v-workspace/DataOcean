import React, { useState } from 'react';
import { Activity, ChevronDown } from 'react-feather';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import NavDropdownItem from 'components/nav/NavDropdownItem';

const NavDropdown = ({ item }) => {
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
      <ul className={isOpen && 'side-menu__sub-open'}>{item.items.map((i) => <NavDropdownItem item={i} isOpen={isOpen} />)}</ul>
    </li>
  );
};

NavDropdown.propTypes = {
  ...ReactRouterPropTypes,
};

export default NavDropdown;
