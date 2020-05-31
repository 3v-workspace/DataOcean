import React from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'react-feather';
import { Link } from 'react-router-dom';

const NavItem = ({ item }) => (
  <li>
    <Link to={item.route} className="side-menu">
      <div className="side-menu__icon">
        {item.icon || <Activity />}
      </div>
      <div className="side-menu__title">{item.title}</div>
    </Link>
  </li>
);

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NavItem;
