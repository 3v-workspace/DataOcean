import React from 'react';
import { Activity } from 'react-feather';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

const NavDropdownItem = ({ item, isOpen }) => (
  <li>
    <Link to={item.route} className="side-menu">
      <div className="side-menu__icon">
        {item.icon || <Activity />}
      </div>
      <div className="side-menu__title">{item.title}</div>
    </Link>
  </li>
);

NavDropdownItem.propTypes = {
  ...ReactRouterPropTypes,
};

export default NavDropdownItem;
