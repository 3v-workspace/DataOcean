import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingIcon from 'components/LoadingIcon';

const buttonTypes = {
  blank: '',
  primary: 'bg-theme-1 text-white',
  secondary: 'border bg-white text-gray-700',
  cancel: 'border border-blue-800 bg-white text-blue-800',
  success: 'bg-theme-9 text-white',
  warning: 'bg-theme-12 text-white',
  danger: 'bg-theme-6 text-white',
  dark: 'bg-gray-200 text-gray-600',
  selected: 'bg-blue-200 m-1',

  'outline-white': 'border border-white',
  'outline-primary': 'border-2 border-theme-1 text-theme-1',
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
const Button = React.forwardRef((props, ref) => {
  const {
    size, children, width, variant, className, isLoading,
    onClick, link, toggleModal, type, disabled, isRounded,
    isElevated, href, target, noFlex, title,
  } = props;

  let handleClick = onClick;

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
  if (!noFlex) {
    classList.push('inline-flex items-center justify-center');
  }
  if (disabled) {
    classList.push('disabled');
    handleClick = (e) => e.preventDefault();
  }

  let Component = 'button';

  const extraProps = {};
  if (href) {
    Component = 'a';
    extraProps.href = href;
    if (target) {
      extraProps.target = target;
    }
  } else if (link) {
    Component = Link;
    extraProps.to = link;
  } else if (toggleModal) {
    Component = 'a';
    extraProps['data-toggle'] = 'modal';
    extraProps['data-target'] = toggleModal;
  }

  return (
    <Component
      ref={ref}
      type={type}
      title={title}
      disabled={disabled}
      onClick={handleClick}
      className={classList.join(' ')}
      {...extraProps}
    >
      {children}
      {isLoading && (
        <Loading size={size} variant={variant} />
      )}
    </Component>
  );
});

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  link: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  width: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(buttonTypes)),
  onClick: PropTypes.func,
  toggleModal: PropTypes.string,
  isLoading: PropTypes.bool,
  isRounded: PropTypes.bool,
  isElevated: PropTypes.bool,
  noFlex: PropTypes.bool,
  title: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  link: '',
  href: '',
  target: '',
  className: '',
  size: undefined,
  width: 'w-100',
  variant: 'primary',
  onClick: () => undefined,
  toggleModal: '',
  isLoading: false,
  isRounded: false,
  isElevated: false,
  noFlex: false,
  title: undefined,
};

export default Button;
