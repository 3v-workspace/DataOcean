import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';

const SelectInput2 = (props) => {
  const { name, options, onChange, onClear, value } = props;
  const { t } = useTranslation();

  const [isShowDropdown, setShowDropdown] = useState(false);
  const [selectValue, setSelectValue] = useState('');

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

  useEffect(() => {
    onChange(name, selectValue);
  }, [selectValue]);

  return (
    <>
      <div className="search hidden sm:block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value={t('selected', { count: value ? 1 : 0, optionsCount: options.length })}
          onClick={showDropdown}
        />
        {isShowDropdown ? (
          <ChevronUp onClick={hideDropdown} className="search__icon cursor-pointer" />
        ) : (
          <ChevronDown onClick={showDropdown} className="search__icon cursor-pointer" />
        )}
      </div>
      <div
        className={`w-auto mt-1 absolute select-dropdown ${isShowDropdown ? 'show' : ''}`}
        onMouseLeave={hideDropdown}
      >
        <div className="select-dropdown__content" onBlur={hideDropdown}>
          <ul>
            <li>
              <h1 className="text-blue-700 mb-1 cursor-pointer" onClick={onClear}>{t('resetFilter')}</h1>
            </li>
            {options.map((option) => (
              <li key={option.value}>
                <hr className="-mx-4" />
                <div
                  className="h-10 flex items-center"
                  onClick={() => {
                    setSelectValue(option.value);
                  }}
                >
                  <input
                    type="radio"
                    className="mr-3 cursor-pointer"
                    checked={option.value === value}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

SelectInput2.defaultProps = {
  onChange: undefined,
  onClear: undefined,
};


export default SelectInput2;
