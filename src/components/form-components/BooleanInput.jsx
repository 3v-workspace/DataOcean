import React from 'react';
import PropTypes from 'prop-types';
import { FormikPropType } from 'utils/prop-types';

const BooleanInput = (props) => {
  const {
    name, label, value, onChange, className, formik,
  } = props;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        className="input border mr-2"
        name={name}
        id={`id_${name}`}
        checked={value || (formik && formik.values[name])}
        onChange={onChange || (formik && formik.handleChange)}
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
  formik: FormikPropType,
};

BooleanInput.defaultProps = {
  className: '',
  value: undefined,
  onChange: undefined,
  formik: undefined,
};

export default BooleanInput;
