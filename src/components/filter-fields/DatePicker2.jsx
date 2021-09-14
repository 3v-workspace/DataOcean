import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { isEqualArray } from 'utils';
import 'styles/datepiker2.scss';

const DatePicker2 = (props) => {
  const { name, options, onChange, value } = props;
  const { t } = useTranslation();

  const [dayValue, setDayValue] = useState();
  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [isShowDropdown, setShowDropdown] = useState(false);
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

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

  function onClear(number) {
    console.log(number);
  }

  function createDay() {
    const days = new Array(31);
    for (let i = 0; i < days.length; i += 1) {
      days[i] = [i + 1];
    }
    return days;
  }

  function createMonth() {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return month;
  }

  function prevPage() {
    setCurrentYear(currentYear - 20);
  }

  function nextPage() {
    setCurrentYear(currentYear + 20);
  }

  function createYear() {
    const year = new Array(20);
    for (let i = 0; i < year.length; i += 1) {
      year[i] = [currentYear - i];
    }
    return year;
  }

  return (
    <>
      <div className="search sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value={t('selected', { optionsCount: options.length })}
          onClick={showDropdown}
        />
        {isShowDropdown ? (
          <ChevronUp onClick={hideDropdown} className="search__icon cursor-pointer" />
        ) : (
          <ChevronDown onClick={showDropdown} className="search__icon cursor-pointer" />
        )}
      </div>
      <div
        className={`w-1/2 sm:w-auto mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
        onMouseLeave={hideDropdown}
      >
        <div className="select-dropdown__content">
          <div className="input-container">
            <div className="input-day">
              <input
                className="inputDay"
                type="text"
                size="2"
                placeholder="XX"
                id="day"
                name="day"
                value={dayValue}
              />
            </div>
            <div className="dropdown">
              <button type="button" className="dropbtn">
                <ChevronDown className="w-4 h-6" />
              </button>
              <div className="dropdown-content">
                {createDay().map((day) => (<button type="button" className="dayButton" onClick={() => setDayValue(day)}>{day}</button>))}
              </div>
            </div>
            <div className="input-month">
              <input
                className="inputMonth"
                type="text"
                size="15"
                placeholder={t('month')}
                value={monthValue}
                id="month"
                name="month"
              />
            </div>
            <div className="dropdown">
              <button type="button" className="dropbtn">
                <ChevronDown className="w-4 h-6" />
              </button>
              <div className="dropdown-content">
                {createMonth().map((month) => (<button type="button" className="monthButton" onClick={() => setMonthValue(t(month))}>{t(month)}</button>))}
              </div>
            </div>
            <div className="input-year">
              <input
                className="inputYear"
                required
                type="text"
                min="1921"
                max="2041"
                size="4"
                placeholder="XXXX"
                id="year"
                name="year"
                value={yearValue}
              />
            </div>
            <div className="dropdown">
              <button type="button" className="dropbtn">
                <ChevronDown className="w-4 h-6" />
              </button>
              <div className="dropdown-content">
                <ChevronLeft onClick={prevPage} className="w-6 h-6 mt+5" style={{ height: '100%' }} />
                <div className="yearsTable">
                  {createYear().map((year) => (<button type="button" className="yearButton" onClick={() => setYearValue(year)}>{year}</button>))}
                </div>
                <ChevronRight onClick={nextPage} className="w-6 h-6 mt+5" style={{ height: '100%' }} />
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="button" onClick={onClear} className="cancelButton">{t('cancel')}</button>
            <button type="submit" onClick={hideDropdown} className="okButton">OK</button>
          </div>
        </div>
      </div>
    </>
  );
};

DatePicker2.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

DatePicker2.defaultProps = {
  value: undefined,
};


export default DatePicker2;
