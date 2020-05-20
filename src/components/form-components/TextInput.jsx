import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  const {
    label, value, onChange, name, id, type, placeholder,
    className, width, size,
  } = props;

  const classList = [];
  if (className) {
    classList.push(className);
  }
  if (size) {
    classList.push(`input--${size}`);
  }
  classList.push('input border mt-2');
  classList.push(width);

  return (
    <div className="mb-3">
      {label && (
        <label>{label}</label>
      )}
      <input
        className={classList.join(' ')}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  id: null,
  className: '',
  label: '',
  width: 'w-full',
  name: null,
  size: null,
  type: 'text',
  placeholder: null,
  value: undefined,
  onChange: undefined,
};

export default TextInput;
