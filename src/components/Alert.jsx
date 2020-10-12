import React from 'react';
import PropTypes from 'prop-types';
import { Info, X } from 'react-feather';

const variants = {
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


  'soft-primary': 'bg-theme-14 text-theme-10',
  'soft-secondary': 'border text-gray-700',
  'soft-success': 'bg-theme-18 text-theme-9',
  'soft-warning': 'bg-theme-17 text-theme-11',
  'soft-danger': 'bg-theme-31 text-theme-6',
  'soft-dark': 'bg-gray-200 text-gray-600',
};


// TODO: Add Support icons
const Alert = (props) => {
  const {
    variant, children, className, icon: Icon, closeButton,
  } = props;

  const classes = [className, 'rounded-md px-5 py-4 mb-2 flex items-center'];
  classes.push(variants[variant]);

  return (
    <div className={classes.join(' ')}>
      <Icon className="w-6 h-6 mr-2" />
      {children}
      {closeButton && (
        <X className="w-4 h-4 ml-auto cursor-pointer" />
      )}
    </div>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(variants)),
  icon: PropTypes.elementType,
  closeButton: PropTypes.bool,
};
Alert.defaultProps = {
  className: '',
  variant: 'primary',
  icon: Info,
  // icon: AlertCircle,
  closeButton: false,
};

export default Alert;
