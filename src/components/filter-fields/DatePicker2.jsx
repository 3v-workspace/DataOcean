import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import 'styles/datepiker2.scss';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import moment from 'moment';
import { Form } from '../form-components';


const DatePicker2 = (props) => {
  const { name, options, onChange, value } = props;
  const { t } = useTranslation();

  const [isShowDropdown, setShowDropdown] = useState(false);
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const formik = useFormik({
    initialValues: {
      day: '',
      month: '',
      year: '',
    },
    validationSchema: Yup.object({
      day: Yup.number()
        .min(1, 'Day must be more than 1!')
        .max(31, 'Day must be less than 31!'),
      month: Yup.string(),
      year: Yup.number()
        .required()
        .min(1920, 'Year must be after 1919!')
        .max(2039, 'Year must be before 2040!'),
    }),
    onSubmit: (values) => {
      let data = '';
      data += ((typeof formik.values.day === 'string') ? formik.values.day : formik.values.day[0]);
      data += ' ';
      data += ((typeof formik.values.month === 'string') ? formik.values.month : formik.values.month[0]);
      data += ' ';
      data += ((typeof formik.values.year === 'string') ? formik.values.year : formik.values.year[0]);
      console.log(data);
      console.log(moment(data, ['uk', 'en']).isValid());
    },
    onChange: () => {
      formik.inputDay.props.disabled = false;
    },
  });

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
    formik.setFieldValue('day', '');
    formik.setFieldValue('month', '');
    formik.setFieldValue('year', '');
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

  function dayDissabled() {
    return moment(formik.values.month, 'MMMM', ['uk', 'en']).isValid() === true ? !(formik.isValid && formik.dirty) : true;
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
          value=""
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
        <Form formik={formik} onSubmit={formik.handleSubmit} enableReinitialize="true">
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
                  onChange={formik.handleChange}
                  value={formik.values.day}
                  formik={formik}
                  disabled={dayDissabled()}
                />
                {formik.errors.day && formik.touched.day && (
                  <p className="errorMessage">{formik.errors.day}</p>
                )}
              </div>
              <div className="dropdown">
                <button type="button" className="dropbtn">
                  <ChevronDown className="w-4 h-6" />
                </button>
                <div className="dropdown-content">
                  {createDay().map((day) => (<button type="button" className="dayButton" onClick={() => formik.setFieldValue('day', day)}>{day}</button>))}
                </div>
              </div>
              <div className="input-month">
                <input
                  className="inputMonth"
                  type="text"
                  size="15"
                  placeholder={t('month')}
                  id="month"
                  onChange={formik.handleChange}
                  value={formik.values.month}
                  formik={formik}
                  disabled={!(formik.isValid && formik.dirty)}
                />
                {formik.errors.month && formik.touched.month && (
                  <p className="errorMessage">{formik.errors.month}</p>
                )}
              </div>
              <div className="dropdown" isDisabled>
                <button type="button" className="dropbtn">
                  <ChevronDown className="w-4 h-6" />
                </button>
                <div className="dropdown-content">
                  {createMonth().map((month) => (<button type="button" className="monthButton" onClick={() => formik.setFieldValue('month', t(month))}>{t(month)}</button>))}
                </div>
              </div>
              <div className="input-year">
                <input
                  className="inputYear"
                  required
                  type="text"
                  size="4"
                  placeholder="XXXX"
                  id="year"
                  name="year"
                  onChange={formik.handleChange}
                  value={formik.values.year}
                  formik={formik}
                />
                {formik.errors.year && formik.touched.year && (
                  <p className="errorMessage">{formik.errors.year}</p>
                )}
              </div>
              <div className="dropdown">
                <button type="button" className="dropbtn">
                  <ChevronDown className="w-4 h-6" />
                </button>
                <div className="dropdown-content" style={{ 'align-items': 'center' }}>
                  <div className="chevron"><ChevronLeft onClick={prevPage} className="w-6 h-6 mt+5" /></div>
                  <div className="yearsTable">
                    {createYear().map((year) => (<button type="button" className="yearButton" onClick={() => formik.setFieldValue('year', year)}>{year}</button>))}
                  </div>
                  <div className="chevron"><ChevronRight onClick={nextPage} className="w-6 h-6 mt+5" /></div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="button" onClick={onClear} className="cancelButton">{t('cancel')}</button>
              <button type="submit" className="okButton">OK</button>
            </div>
          </div>
        </Form>
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
