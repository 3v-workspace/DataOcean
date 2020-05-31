import React from 'react';
import PropTypes from 'prop-types';

const LoadingIcon = (props) => {
  const { icon, color, className } = props;

  switch (icon) {
    case 'oval':
      return (
        <svg
          width="25"
          viewBox="-2 -2 42 42"
          xmlns="http://www.w3.org/2000/svg"
          stroke={color}
          className={className}
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="4">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      );
    default:
      return null;
  }
};

LoadingIcon.propTypes = {
  icon: PropTypes.oneOf(['oval']).isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};
LoadingIcon.defaultProps = {
  className: '',
  color: 'black',
};

export default LoadingIcon;
