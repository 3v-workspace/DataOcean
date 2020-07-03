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
    case 'tail-spin':
      return (
        <svg
          width="20"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          stroke={color}
        >
          <defs>
            <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
              <stop stopColor="rgb(45, 55, 72)" stopOpacity="0" offset="0%" />
              <stop stopColor="rgb(45, 55, 72)" stopOpacity=".631" offset="63.146%" />
              <stop stopColor="rgb(45, 55, 72)" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                id="Oval-2"
                stroke="url(#a)"
                strokeWidth="3"
                transform="rotate(260.561 18 18)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle fill="rgb(45, 55, 72)" cx="36" cy="18" r="1" transform="rotate(260.561 18 18)">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      );
    default:
      return null;
  }
};

LoadingIcon.propTypes = {
  icon: PropTypes.oneOf(['oval', 'tail-spin']).isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};
LoadingIcon.defaultProps = {
  className: 'w-8 h-8',
  color: 'black',
};

export default LoadingIcon;
