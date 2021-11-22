import React from 'react';
import PropTypes from 'prop-types';

const HtmlBlock = (props) => {
  const { data } = props;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data.replace(/(\\r\\n)+/g, '</br>').replace(/(\\")+/g, '"').replace(
          /<a/g, '<a class="cursor-pointer blue"',
        ),
      }}
    />
  );
};

HtmlBlock.propTypes = {
  data: PropTypes.string.isRequired,
};

export default HtmlBlock;
