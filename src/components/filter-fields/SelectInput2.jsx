import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { isEqualArray } from 'utils';
import ReactDOM from 'react-dom';

const SelectInput2 = (props) => {
  const { name, options, onChange, value, multiple, tableScrollParam } = props;
  const { t } = useTranslation();

  let defaultValue;
  if (value === undefined) {
    defaultValue = multiple ? [] : '';
  } else {
    defaultValue = value;
  }

  const [selectValue, setSelectValue] = useState(defaultValue);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [offsetParams, setOffsetParams] = useState({
    left: 0, top: 0, height: 0,
  });
  const selectInputRef = useRef();
  const portalContainer = document.getElementById('div_for_dropdown');

  useEffect(() => {
    setDomReady(true);
  }, []);


  const hideDropdown = () => {
    if (isShowDropdown) {
      setShowDropdown(false);
    }
  };

  const showDropdown = () => {
    if (!isShowDropdown) {
      setShowDropdown(true);
      setOffsetParams({
        left: selectInputRef.current.offsetLeft - tableScrollParam,
        top: selectInputRef.current.offsetTop,
        height: selectInputRef.current.offsetHeight,
      });
    }
  };

  const onClear = () => {
    if (multiple) {
      setSelectValue([]);
    } else setSelectValue('');
  };

  useEffect(() => {
    if (multiple) {
      if (!isEqualArray(selectValue, value)) {
        setSelectValue([...value]);
      }
    } else if (selectValue !== value) {
      setSelectValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (multiple) {
      if (!isEqualArray(selectValue, value)) {
        onChange(name, selectValue);
      }
    } else if (selectValue !== value) {
      onChange(name, selectValue);
    }
  }, [selectValue]);

  const handleChange = (option) => {
    if (!multiple) {
      setSelectValue(option.value);
      return;
    }
    if (selectValue.includes(option.value)) {
      const newSelectValue = [...selectValue];
      newSelectValue.splice(newSelectValue.indexOf(option.value), 1);
      setSelectValue(newSelectValue);
    } else {
      setSelectValue([option.value, ...selectValue]);
    }
  };

  let count;
  if (multiple) {
    count = selectValue.length;
  } else {
    count = selectValue ? 1 : 0;
  }

  return (
    <>
      <div ref={selectInputRef} className="search sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value={t('selected', { count, optionsCount: options.length })}
          onClick={showDropdown}
        />
        {isShowDropdown ? (
          <ChevronUp onClick={hideDropdown} className="search__icon cursor-pointer" />
        ) : (
          <ChevronDown onClick={showDropdown} className="search__icon cursor-pointer" />
        )}
      </div>
      {domReady ? ReactDOM.createPortal(
        <div
          className={`${multiple ? 'w-64' : 'w-1/2 sm:w-auto'} mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
          style={{
            left: offsetParams.left,
            top: offsetParams.top + offsetParams.height,
          }}
          onMouseLeave={hideDropdown}
        >
          <div className="select-dropdown__content">
            <ul>
              <li className="pt-2">
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
        </div>, portalContainer,
      ) : null}
    </>
  );
};

SelectInput2.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  tableScrollParam: PropTypes.number,
};

SelectInput2.defaultProps = {
  value: undefined,
  multiple: false,
  tableScrollParam: 0,
};


export default SelectInput2;
