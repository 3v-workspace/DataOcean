import React from 'react';
import PropTypes from 'prop-types';

const PepHtml = (props) => {
  const { data } = props;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data.replace(/(\\r\\n)+/g, '</br>').replace(/(\\")+/g, '"').replace(
          /<a/g, '<a class="cursor-pointer text-blue-900" style="font-weight:bold"',
        ),
      }}
    />
  );
};

PepHtml.propTypes = {
  data: PropTypes.string.isRequired,
};

export default PepHtml;
