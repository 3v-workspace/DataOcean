import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingIcon from 'components/LoadingIcon';

const buttonTypes = {
  blank: '',
  primary: 'bg-theme-1 text-white',
  secondary: 'border bg-white text-gray-700',
  success: 'bg-theme-9 text-white',
  warning: 'bg-theme-12 text-white',
  danger: 'bg-theme-6 text-white',
  dark: 'bg-gray-200 text-gray-600',

  'outline-white': 'border border-white',
  'outline-primary': 'border border-theme-1 text-theme-1',
  'outline-secondary': 'border text-gray-700',
  'outline-success': 'border border-theme-9 text-theme-9',
  'outline-warning': 'border border-theme-12 text-theme-12',
  'outline-danger': 'border border-theme-6 text-theme-6',
};

const loadingColors = {
  primary: 'white',
  secondary: 'white',
  success: 'white',
  warning: 'white',
  danger: 'white',
  dark: 'white',

  'outline-white': 'white',
};

const Loading = (props) => {
  const { size, variant } = props;

  const classList = ['ml-1'];

  switch (size) {
    case 'sm':
      classList.push('w-4 h-4');
      break;
    case 'md':
      classList.push('w-4 h-4');
      break;
    case 'lg':
      classList.push('w-5 h-5');
      break;
    default:
      break;
  }

  return (
    <LoadingIcon icon="oval" color={loadingColors[variant]} className={classList.join(' ')} />
  );
};
Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(Object.keys(buttonTypes)).isRequired,
};
Loading.defaultProps = {
  size: 'md',
};

// TODO: disabled effect
const Button = (props) => {
  const {
    size, children, width, variant, className, isLoading,
    onClick, link, toggleModal, type, disabled, isRounded,
    isElevated,
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
  if (isRounded) {
    classList.push('rounded-full');
  }
  if (isElevated) {
    classList.push('shadow-md');
  }
  if (variant !== 'blank') {
    classList.push(buttonTypes[variant]);
  }
  classList.push('inline-flex items-center justify-center');

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
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classList.join(' ')}
      {...extraProps}
    >
      {children}
      {isLoading && (
        <Loading size={size} variant={variant} />
      )}
    </Component>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  link: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  width: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(buttonTypes)),
  onClick: PropTypes.func,
  toggleModal: PropTypes.string,
  isLoading: PropTypes.bool,
  isRounded: PropTypes.bool,
  isElevated: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  link: '',
  className: '',
  size: undefined,
  width: 'w-100',
  variant: 'primary',
  onClick: () => undefined,
  toggleModal: '',
  isLoading: false,
  isRounded: false,
  isElevated: false,
};

export default Button;
