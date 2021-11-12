import React, { useEffect, useState, useRef } from 'react';
import Shadow, { resetScrollParams, handleWindowResize, checkScrollParams } from 'components/table/Shadow';

const SanctionTableShadow = (props) => {
  const { children } = props;
  const tableRef = useRef();
  const [scrollParams, setScrollParams] = useState({
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  });


  useEffect(() => {
    resetScrollParams(tableRef, setScrollParams);
    window.addEventListener('resize', () => { handleWindowResize(tableRef, setScrollParams); });
    return () => {
      window.removeEventListener('resize', () => { handleWindowResize(tableRef, setScrollParams); });
    };
  }, []);


  return (
    <>
      <Shadow scrollParams={scrollParams} />
      <div
        className="overflow-auto"
        style={{ maxWidth: 'calc(100vw - 240px)', maxHeight: 'calc(100vh - 250px)' }}
        ref={tableRef}
        onScroll={() => checkScrollParams(tableRef, scrollParams, setScrollParams)}
      >
        {children}
      </div>
    </>
  );
};

export default SanctionTableShadow;
