import React from 'react';
import PropTypes from 'prop-types';
import FormikPropType from 'utils/formik-prop-types';

const TextInput = (props) => {
  const {
    label, value, onChange, name, id, type, placeholder,
    className, width, size, formik, onBlur,
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

  if (formik && formik.touched[name] && formik.errors[name]) {
    classList.push('error');
  }

  const endId = id || `id_${name}`;

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={endId}>{label}</label>
      )}
      <input
        className={classList.join(' ')}
        id={endId}
        type={type}
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
  label: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,

  formik: FormikPropType,
};

TextInput.defaultProps = {
  id: null,
  className: '',
  label: '',
  width: 'w-full',
  size: null,
  type: 'text',
  placeholder: null,
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  formik: undefined,
};

export default TextInput;
