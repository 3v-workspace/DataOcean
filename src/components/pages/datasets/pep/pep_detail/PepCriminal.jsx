import React from 'react';
import PropTypes from 'prop-types';
import PepHtml from './PepHtml';

const PepCriminal = (props) => {
  const { data } = props;
  if (data[0].noCriminal) {
    return (
      <div className="text-center text-xl">
        {data[0].noCriminal}
      </div>
    );
  }

  return <PepHtml data={data} />;
};

PepCriminal.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]).isRequired,
};

export default PepCriminal;
