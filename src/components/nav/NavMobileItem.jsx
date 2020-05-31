import React from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'react-feather';
import { Link } from 'react-router-dom';

const NavMobileItem = ({ item }) => (
  <li>
    <Link to={item.route} className="menu menu--active">
      <div className="menu__icon">
        {item.icon || <Activity />}
      </div>
      <div className="menu__title"> {item.title} </div>
    </Link>
  </li>
);

NavMobileItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NavMobileItem;
