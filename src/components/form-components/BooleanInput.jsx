import React from 'react';
import PropTypes from 'prop-types';
import { FormikPropType } from 'utils/prop-types';

const BooleanInput = (props) => {
  const {
    name, label, value, onChange, className, formik,
    switchStyle, readOnly, onClick, required,
  } = props;

  const classNames = ['input border mr-2'];

  if (switchStyle) {
    classNames.push('input--switch');
  }

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        readOnly={readOnly}
        className={classNames.join(' ')}
        onClick={onClick}
        name={name}
        id={`id_${name}`}
        checked={value !== null && value !== undefined ? value : (formik && formik.values[name])}
        onChange={onChange || (formik && formik.handleChange)}
      />
      {label && (
        <label className="cursor-pointer select-none" htmlFor={`id_${name}`}>
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
      )}
    </div>
  );
};

BooleanInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  formik: FormikPropType,
  switchStyle: PropTypes.bool,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  required: PropTypes.bool,
};

BooleanInput.defaultProps = {
  className: '',
  label: '',
  readOnly: false,
  value: undefined,
  onChange: undefined,
  formik: undefined,
  switchStyle: false,
  onClick: undefined,
  required: false,
};

export default BooleanInput;
