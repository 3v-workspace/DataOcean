import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const PepOtherNames = (props) => {
  const { data } = props;
  const [quantityColumns, setQuantityColumns] = useState('2');
  const ulRef = useRef();

  useEffect(() => {
    [...ulRef.current.children].forEach((item) => {
      if (item.offsetWidth > 280) {
        setQuantityColumns('1');
      }
    });
  }, []);


  return (
    <ul
      className={`grid grid-cols-${quantityColumns} gap-2`}
      ref={ulRef}
    >
      {data.split('\n').map((fullname, i) => (
        <li key={i} style={{ width: 'max-content' }}>
          {fullname}
        </li>
      ))}
    </ul>
  );
};

PepOtherNames.propTypes = {
  data: PropTypes.string.isRequired,
};

export default PepOtherNames;
