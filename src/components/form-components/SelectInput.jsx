/* global $ */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// TODO: finish this
const SelectInput = (props) => {
  const {
    options, width, hideSearch, multiple, placeholder, disabled, onChange, className,
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
    $(selectRef.current).on('change', onChange);
  }, []);

  return (
    <div className="mt-2">
      <select
        ref={selectRef}
        className={classList.join(' ')}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  hideSearch: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  width: PropTypes.string,
};

SelectInput.defaultProps = {
  className: '',
  disabled: false,
  multiple: false,
  onChange: undefined,
  hideSearch: false,
  placeholder: null,
  width: 'w-full',
};

export default SelectInput;
