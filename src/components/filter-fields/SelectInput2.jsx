import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';

const SelectInput2 = (props) => {
  const { name, options, onChange, value, multiple } = props;
  const { t } = useTranslation();

  const [isShowDropdown, setShowDropdown] = useState(false);
  const [selectValue, setSelectValue] = useState([]);

  const hideDropdown = () => {
    if (isShowDropdown) {
      setShowDropdown(false);
    }
  };

  const showDropdown = () => {
    if (!isShowDropdown) {
      setShowDropdown(true);
    }
  };

  const triggerChange = (newValue) => {
    if (multiple) {
      onChange(name, newValue);
    } else {
      onChange(name, newValue[0] || []);
    }
  };

  const onClear = () => {
    setSelectValue([]);
  };

  useEffect(() => {
    triggerChange(selectValue);
  }, [JSON.stringify(selectValue.sort())]);

  const handleChange = (option) => {
    if (!multiple) {
      setSelectValue([option.value]);
      return;
    }
    if (selectValue.includes(option.value)) {
      selectValue.splice(selectValue.indexOf(option.value), 1);
      setSelectValue([...selectValue]);
    } else {
      setSelectValue([option.value, ...selectValue]);
    }
  };

  return (
    <>
      <div className="search hidden sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value={t('selected', { count: value ? value.length : 0, optionsCount: options.length })}
          onClick={showDropdown}
        />
        {isShowDropdown ? (
          <ChevronUp onClick={hideDropdown} className="search__icon cursor-pointer" />
        ) : (
          <ChevronDown onClick={showDropdown} className="search__icon cursor-pointer" />
        )}
      </div>
      <div
        className={`${multiple ? 'w-64' : 'w-auto'} mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
        onMouseLeave={hideDropdown}
      >
        <div className="select-dropdown__content">
          <ul>
            <li>
              <h1 className="text-blue-700 mb-1 cursor-pointer" onClick={onClear}>{t('resetFilter')}</h1>
            </li>
            {options.map((option) => (
              <li key={option.value}>
                <hr className="-mx-4" />
                <div
                  className="py-2 flex items-center whitespace-normal cursor-pointer"
                  onClick={() => handleChange(option)}
                >
                  <input
                    type={multiple ? 'checkbox' : 'radio'}
                    className="mr-3"
                    checked={selectValue.includes(option.value)}
                    onChange={() => {}}
                  />
                  <label className="text-gray-800 font-normal cursor-pointer" htmlFor={option.value}>{option.label}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

SelectInput2.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
};

SelectInput2.defaultProps = {
  onChange: undefined,
  multiple: false,
  value: [],
};


export default SelectInput2;
