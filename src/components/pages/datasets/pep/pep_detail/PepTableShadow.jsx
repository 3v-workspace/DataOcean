import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Shadow from 'components/table/Shadow';
import { debounce, throttle } from 'throttle-debounce';

const PepTableShadow = (props) => {
  const { children, top, bottom, left, right } = props;
  const tableRef = useRef();
  const [scrollParams, setScrollParams] = useState({
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  });

  const resetScrollParams = () => {
    setScrollParams({
      scrollLeft: tableRef.current.scrollLeft,
      offsetWidth: tableRef.current.offsetWidth,
      scrollWidth: tableRef.current.scrollWidth,
    });
  };

  const checkScrollParams = debounce(250, true, () => {
    if (scrollParams.scrollLeft !== tableRef.current.scrollLeft) {
      resetScrollParams();
    }
  });

  useEffect(() => {
    resetScrollParams();
    const handleWindowResize = throttle(250, false, () => {
      if (window.innerWidth > 780) {
        resetScrollParams();
      }
    });
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <Shadow
        scrollParams={scrollParams}
        top={top}
        bottom={bottom}
        left={left}
        right={right}
      />
      <div
        className="w-max overflow-x-auto p-px"
        ref={tableRef}
        onScroll={checkScrollParams}
      >
        {children}
      </div>
    </>
  );
};

PepTableShadow.propTypes = {
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
};

PepTableShadow.defaultProps = {
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
};

export default PepTableShadow;
