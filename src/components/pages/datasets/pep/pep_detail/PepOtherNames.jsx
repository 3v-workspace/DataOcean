import React from 'react';
import PropTypes from 'prop-types';

const PepOtherNames = (props) => {
  const { data } = props;

  return (
    <ul className="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-2">
      {data.split('\n').map((fullname, i) => (
        <li key={i}>
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
