import React, { useState, useRef, useEffect } from 'react';
import Shadow from 'components/table/Shadow';
import { debounce, throttle } from 'throttle-debounce';

const PepTableShadow = (props) => {
  const { children } = props;
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
      <Shadow scrollParams={scrollParams} className="table-shadow-indent" />
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

export default PepTableShadow;
