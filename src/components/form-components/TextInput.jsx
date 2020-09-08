import React from 'react';
import PropTypes from 'prop-types';
import { FormikPropType } from 'utils/prop-types';

const TextInput = (props) => {
  const {
    label, value, onChange, name, id, type, placeholder,
    className, width, size, formik, onBlur, isRounded,
    containerClass, autoComplete,
  } = props;

  const classList = [];
  if (className) {
    classList.push(className);
  }
  if (size) {
    classList.push(`input--${size}`);
  }
  if (isRounded) {
    classList.push('rounded-full');
  }
  classList.push('input border');
  classList.push(width);

  if (formik && formik.touched[name] && formik.errors[name]) {
    classList.push('error');
  }

  const endId = id || `id_${name}`;

  return (
    <div className={`${containerClass} mb-3`}>
      {label && (
        <label htmlFor={endId} className="inline-block mb-2">{label}</label>
      )}
      <input
        className={classList.join(' ')}
        id={endId}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value || (formik && formik.values[name])}
        onChange={onChange || (formik && formik.handleChange)}
        onBlur={onBlur || (formik && formik.handleBlur)}
        name={name}
      />
      {formik && formik.touched[name] && formik.errors[name] && (
        <label className="error" htmlFor={endId}>{formik.errors[name]}</label>
      )}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  label: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  width: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isRounded: PropTypes.bool,
  formik: FormikPropType,
};

TextInput.defaultProps = {
  className: '',
  containerClass: '',
  label: '',
  width: 'w-full',
  type: 'text',
  id: undefined,
  size: undefined,
  autoComplete: undefined,
  placeholder: undefined,
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  isRounded: false,
  formik: undefined,
};

export default TextInput;
