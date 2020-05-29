import React from 'react';
import PropTypes from 'prop-types';
import FormikPropType from 'utils/formik-prop-types';
import { Search } from 'react-feather';

const SearchInput = (props) => {
  const {
    label, value, onChange, name, id, placeholder,
    className, width, size, formik, onBlur, onSubmit,
  } = props;

  const classList = [];
  if (className) {
    classList.push(className);
  }
  if (size) {
    classList.push(`input--${size}`);
  }
  classList.push('input border');
  classList.push('w-full');

  if (formik && formik.touched[name] && formik.errors[name]) {
    classList.push('error');
  }

  const endId = id || `id_${name}`;

  return (
    <div className={`${width} mb-3 flex items-center justify-left relative inline-block`}>
      {label && (
        <label htmlFor={endId}>{label}</label>
      )}
      <input
        className={classList.join(' ')}
        id={endId}
        placeholder={placeholder}
        value={value || (formik && formik.values[name])}
        onChange={onChange || (formik && formik.handleChange)}
        onBlur={onBlur || (formik && formik.handleBlur)}
        onSubmit={onSubmit || (formik && formik.handleSubmit)}
        name={name}
      />
      <i className="cursor-pointer w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 flex items-center">
        <Search />
      </i>
      {/* {formik && formik.touched[name] && formik.errors[name] && (
        <label className="error" htmlFor={endId}>{formik.errors[name]}</label>
      )} */}
    </div>
  );
};

SearchInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  formik: FormikPropType,
};

SearchInput.defaultProps = {
  id: null,
  className: '',
  label: '',
  width: 'w-1/2',
  size: undefined,
  placeholder: 'Пошук',
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onSubmit: undefined,
  formik: undefined,
};

export default SearchInput;
