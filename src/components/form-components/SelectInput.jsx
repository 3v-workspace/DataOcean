/* global $ */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FormikPropType from 'utils/formik-prop-types';

// TODO: finish this
const SelectInput = (props) => {
  const {
    options, width, hideSearch, multiple, placeholder, value,
    disabled, onChange, className, formik, name, label,
  } = props;

  const selectRef = useRef();
  const classList = [];
  if (className) {
    classList.push(className);
  }
  classList.push(width);

  useEffect(() => {
    $(selectRef.current).select2({
      placeholder,
      multiple,
      disabled,
      minimumResultsForSearch: hideSearch ? -1 : 0,
    });
    if (onChange) {
      $(selectRef.current).on('change', onChange);
    } else if (formik) {
      $(selectRef.current).on('change', (e) => {
        if (!formik.touched[name]) {
          formik.setFieldTouched(name, true);
        }
        formik.handleChange(e);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder, multiple, disabled, onChange, hideSearch, name]);

  useEffect(() => {
    $(selectRef.current).val(value || (formik && formik.values[name]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formik.values[name]), name]);

  return (
    <>
      {label && (
        <label htmlFor={`id_${name}`}>{label}</label>
      )}
      <select
        ref={selectRef}
        id={`id_${name}`}
        name={name}
        className={classList.join(' ')}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {formik && formik.touched[name] && formik.errors[name] && (
        <label className="error" htmlFor={`id_${name}`}>{formik.errors[name]}</label>
      )}
    </>
  );
};

SelectInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  // clearable: PropTypes.bool,
  multiple: PropTypes.bool,
  hideSearch: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  width: PropTypes.string,
  formik: FormikPropType,
};

SelectInput.defaultProps = {
  className: '',
  disabled: false,
  // clearable: false,
  multiple: false,
  onChange: undefined,
  hideSearch: false,
  value: null,
  label: '',
  placeholder: null,
  width: 'w-full',
  formik: null,
};

export default SelectInput;
