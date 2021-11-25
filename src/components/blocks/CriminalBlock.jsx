import React from 'react';
import PropTypes from 'prop-types';
import HtmlBlock from './HtmlBlock';

const CriminalBlock = (props) => {
  const { data } = props;

  if (data[0].noCriminal) {
    return (
      <div className="text-center text-xl">
        {data[0].noCriminal}
      </div>
    );
  }

  return <HtmlBlock data={data} />;
};

CriminalBlock.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]).isRequired,
};

export default CriminalBlock;
