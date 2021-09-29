import React from 'react';
import PropTypes from 'prop-types';

const Shadow = (props) => {
  const { scrollParams, className } = props;

  let tableClassName = 'table-shadow ';
  if (scrollParams.scrollWidth > scrollParams.offsetWidth) {
    if (scrollParams.scrollLeft === 0) {
      tableClassName += 'table-shadow-r';
    } else if (scrollParams.scrollLeft < scrollParams.scrollWidth - scrollParams.offsetWidth) {
      tableClassName += 'table-shadow-x';
    } else {
      tableClassName += 'table-shadow-l';
    }
  } else {
    tableClassName += 'hidden';
  }

  return (
    <div className={`${tableClassName} ${className}`} />
  );
};

Shadow.propTypes = {
  scrollParams: PropTypes.object,
  className: PropTypes.string,
};

Shadow.defaultProps = {
  scrollParams: {
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  },
  className: '',
};

export default Shadow;
