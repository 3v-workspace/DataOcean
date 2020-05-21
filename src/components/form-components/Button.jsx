import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const buttonTypes = {
  primary: 'bg-theme-1 text-white',
  secondary: 'border text-gray-700',
  success: 'bg-theme-9 text-white',
  warning: 'bg-theme-12 text-white',
  danger: 'bg-theme-6 text-white',
  dark: 'bg-gray-200 text-gray-600',
};

const Button = (props) => {
  const {
    size, children, width, variant, className,
    onClick, link, toggleModal,
  } = props;

  const classList = [];

  if (className) {
    classList.push(className);
  }
  classList.push('button');
  classList.push(width);

  if (size) {
    classList.push(`button--${size}`);
  }
  classList.push(buttonTypes[variant]);
  classList.push('mr-1 mb-2');

  let Component = 'button';

  const extraProps = {};
  if (link) {
    Component = Link;
    extraProps.to = link;
  } else if (toggleModal) {
    Component = 'a';
    extraProps['data-toggle'] = 'modal';
    extraProps['data-target'] = toggleModal;
  }

  return (
    <Component
      type="button"
      onClick={onClick}
      className={classList.join(' ')}
      {...extraProps}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  link: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  width: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(buttonTypes)),
  onClick: PropTypes.func,
  toggleModal: PropTypes.string,
};

Button.defaultProps = {
  link: '',
  className: '',
  size: null,
  width: 'w-100',
  variant: 'primary',
  onClick: () => undefined,
  toggleModal: '',
};

export default Button;
