import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { isEqualArray } from 'utils';

const SelectInput2 = (props) => {
  const { name, options, onChange, value, multiple } = props;
  const { t } = useTranslation();

  let defaultValue;
  if (value === undefined) {
    defaultValue = multiple ? [] : '';
  } else {
    defaultValue = value;
  }

  const [selectValue, setSelectValue] = useState(defaultValue);
  const [isShowDropdown, setShowDropdown] = useState(false);

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
      <div className="search sm:inline-block">
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
      <div
        className={`${multiple ? 'w-164' : 'w-1/2 sm:w-auto'} mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
        onMouseLeave={hideDropdown}
      >
        <div className="select-dropdown__content">
          <ul>
            <li>
              <hr className="-mx-4" />
              <div
                className="py-2 flex items-center whitespace-normal cursor-pointer"
              >
                <input
                  type="text"
                  size="2"
                  placeholder="XX"
                  id="day"
                  name="day"
                  style={{ color: 'black' }}
                />
                <div className="dropdown" color="black">
                  <button type="button" className="dropbtn">
                    <i className="fa fa-caret-down">.
                    </i>
                  </button>
                  <div className="dropdown-content">
                    <div className="header" />
                    <div className="row">
                      <div className="column">
                        <a href="#">1</a>
                        <a href="#">8</a>
                        <a href="#">15</a>
                        <a href="#">22</a>
                        <a href="#">29</a>
                      </div>
                      <div className="column">
                        <a href="#">2</a>
                        <a href="#">9</a>
                        <a href="#">16</a>
                        <a href="#">23</a>
                        <a href="#">30</a>
                      </div>
                      <div className="column">
                        <a href="#">3</a>
                        <a href="#">10</a>
                        <a href="#">17</a>
                        <a href="#">24</a>
                        <a href="#">31</a>
                      </div>
                      <div className="column">
                        <a href="#">4</a>
                        <a href="#">11</a>
                        <a href="#">18</a>
                        <a href="#">25</a>
                      </div>
                      <div className="column">
                        <a href="#">5</a>
                        <a href="#">12</a>
                        <a href="#">19</a>
                        <a href="#">26</a>
                      </div>
                      <div className="column">
                        <a href="#">6</a>
                        <a href="#">13</a>
                        <a href="#">20</a>
                        <a href="#">27</a>
                      </div>
                      <div className="column">
                        <a href="#">7</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <button type="button" onClick={onClear} style={{ color: 'blue', background: 'white', border: '2px solid #008CBA' }}>{t('resetFilter')}</button>

              <button type="button" onClick={hideDropdown} style={{ color: 'white', background: 'blue' }}>Click Me!</button>
            </li>
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
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

SelectInput2.defaultProps = {
  value: undefined,
  multiple: false,
};


export default SelectInput2;
