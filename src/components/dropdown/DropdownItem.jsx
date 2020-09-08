import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = (props) => {
  const { onClick, children } = props;

  return (
    <div
      className={
        'block p-2 transition duration-300 ease-in-out ' +
        'bg-white hover:bg-gray-200 rounded-md cursor-pointer'
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
};

DropdownItem.propTypes = {
  onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
  onClick: undefined,
};

export default DropdownItem;
