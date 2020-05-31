import React from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'react-feather';
import { NavLink } from 'react-router-dom';

const NavItem = ({ item }) => (
  <li>
    <NavLink to={item.path} className="side-menu" activeClassName="side-menu--active">
      <div className="side-menu__icon">
        {item.icon || <Activity />}
      </div>
      <div className="side-menu__title">{item.title}</div>
    </NavLink>
  </li>
);

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NavItem;
