import React from 'react';
import PropTypes from 'prop-types';

const Shadow = (props) => {
  const { scrollParams } = props;

  let className = 'table-shadow ';
  if (scrollParams.scrollWidth > scrollParams.offsetWidth) {
    if (scrollParams.scrollLeft === 0) {
      className += 'table-shadow-r';
    } else if (scrollParams.scrollLeft < scrollParams.scrollWidth - scrollParams.offsetWidth) {
      className += 'table-shadow-x';
    } else {
      className += 'table-shadow-l';
    }
  } else {
    className += 'hidden';
  }

  return (
    <div className={className} />
  );
};

Shadow.propTypes = {
  scrollParams: PropTypes.object,
};

Shadow.defaultProps = {
  scrollParams: {
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  },
};

export default Shadow;
