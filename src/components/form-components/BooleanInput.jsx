import React from 'react';
import PropTypes from 'prop-types';

const BooleanInput = (props) => {
  const {
    name, label, value, onChange, className,
  } = props;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        className="input border mr-2"
        name={name}
        id={`id_${name}`}
        checked={value}
        onChange={onChange}
      />
      <label className="cursor-pointer select-none" htmlFor={`id_${name}`}>
        {label}
      </label>
    </div>
  );
};

BooleanInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

BooleanInput.defaultProps = {
  className: '',
  value: undefined,
  onChange: undefined,
};

export default BooleanInput;
