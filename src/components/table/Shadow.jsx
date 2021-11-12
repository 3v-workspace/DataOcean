import React from 'react';
import PropTypes from 'prop-types';
import { debounce, throttle } from 'throttle-debounce';

const Shadow = (props) => {
  const { scrollParams, top, bottom, left, right, borderRadius } = props;

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
      style={{ top, bottom, left, right, borderRadius }}
    />
  );
};

Shadow.propTypes = {
  scrollParams: PropTypes.object,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
  borderRadius: PropTypes.string,
};

Shadow.defaultProps = {
  scrollParams: {
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  },
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  borderRadius: '0',
};

export default Shadow;

export const resetScrollParams = (tableRef, setScrollParams) => {
  setScrollParams({
    scrollLeft: tableRef.current.scrollLeft,
    offsetWidth: tableRef.current.offsetWidth,
    scrollWidth: tableRef.current.scrollWidth,
  });
};

export const checkScrollParams = debounce(0, true, (tableRef, scrollParams, setScrollParams) => {
  if (scrollParams.scrollLeft !== tableRef.current.scrollLeft) {
    resetScrollParams(tableRef, setScrollParams);
  }
});

export const handleWindowResize = throttle(250, false, (tableRef, setScrollParams) => {
  if (window.innerWidth > 780 && tableRef.current) {
    resetScrollParams(tableRef, setScrollParams);
  }
});
