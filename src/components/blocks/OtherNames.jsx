import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const OtherNames = (props) => {
  const { data } = props;
  const [className, setClassName] = useState('lg:grid-cols-2');
  const ulRef = useRef();

  useEffect(() => {
    [...ulRef.current.children].forEach((item) => {
      if (item.offsetWidth > 280) {
        setClassName('');
      }
    });
  }, []);


  return (
    <ul
      className={`grid grid-cols-1 ${className} gap-2`}
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

OtherNames.propTypes = {
  data: PropTypes.string.isRequired,
};

export default OtherNames;
