import React from 'react';
import PropTypes from 'prop-types';

const Shadow = (props) => {
  const { scrollParams, borderRadius } = props;

  let className = 'inset-0 table-shadow ';
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
    <div
      className={className}
      style={{ borderRadius }}
    />
  );
};

Shadow.propTypes = {
  scrollParams: PropTypes.object,
  // top: PropTypes.string,
  // left: PropTypes.string,
  // bottom: PropTypes.string,
  // right: PropTypes.string,
  borderRadius: PropTypes.string,
};

Shadow.defaultProps = {
  scrollParams: {
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  },
  // top: '0',
  // bottom: '0',
  // left: '0',
  // right: '0',
  borderRadius: '0',
};

export default Shadow;
