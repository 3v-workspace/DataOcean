import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import 'styles/datepiker2.scss';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import moment from 'moment';
import { Form } from '../form-components';


const DatePicker2 = (props) => {
  const { name, onChange, value } = props;
  const { t } = useTranslation();

  const [isShowDropdown, setShowDropdown] = useState(false);
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectValue, setSelectValue] = useState('false');
  const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formik = useFormik({
    initialValues: {
      day: '',
      month: '',
      year: '',
    },
    validationSchema: Yup.object({
      month: Yup
        .string()
        .oneOf(monthArr.concat((monthArr.map((mon) => t(mon)))), t('Wrong data format')),
      year: Yup.number()
        .required()
        .min(1920, t('Wrong data format'))
        .max(2039, t('Wrong data format')),
      day: Yup.number()
        .min(1, t('Wrong data format'))
        .max(31, t('Wrong data format')),
    }),
    onSubmit: (values) => {
      let data = '';
      data += formik.values.day;
      data += ' ';
      data += formik.values.month;
      data += ' ';
      data += formik.values.year;
      setSelectValue(data);
    },
  });

  function onClear(number) {
    formik.setFieldValue('day', '');
    formik.setFieldValue('month', '');
    formik.setFieldValue('year', '');
  }

  function prevPage() {
    setCurrentYear(currentYear - 20);
  }

  function nextPage() {
    setCurrentYear(currentYear + 20);
  }

  function createYears() {
    const year = new Array(5);
    let n = currentYear;
    for (let i = 0; i < year.length; i += 1) {
      const row = new Array(4);
      for (let j = 0; j < row.length; j += 1) {
        row[j] = n;
        n -= 1;
      }
      year[i] = row;
    }
    return year;
  }

  function createDays() {
    const day = new Array(5);
    let n = 1;
    for (let i = 0; i < day.length; i += 1) {
      const row = new Array(7);
      for (let j = 0; j < row.length; j += 1) {
        if (n < 32) {
          row[j] = n;
          n += 1;
        }
      }
      day[i] = row;
    }
    return day;
  }

  function createMonths() {
    const months = new Array(4);
    let n = 0;
    for (let i = 0; i < months.length; i += 1) {
      const row = new Array(3);
      for (let j = 0; j < row.length; j += 1) {
        row[j] = t(monthArr[n]);
        n += 1;
      }
      months[i] = row;
    }
    return months;
  }

  return (
    <>
      <div className="search sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value=""
          onClick={() => setShowDropdown(true)}
        />
        {isShowDropdown ? (
          <ChevronUp onClick={() => setShowDropdown(false)} className="search__icon cursor-pointer" />
        ) : (
          <ChevronDown onClick={() => setShowDropdown(true)} className="search__icon cursor-pointer" />
        )}
      </div>
      <div
        className={`w-1/2 sm:w-auto mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <Form className="datepicker_form" formik={formik}>
          <div className="sdc">
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
                />
                {!(formik.errors.year || formik.errors.month) ?
                  formik.errors.day && formik.touched.day && (
                  <p className="errorMessage">{formik.errors.day}</p>
                  ) : ''}
              </div>
              <div className="dropdown-date">
                <button type="button" className="dropbtn">
                  <ChevronDown className="w-4 h-6" />
                </button>
                <div className="dropdown-content">
                  <table>
                    <tbody>
                      {createDays().map((row) => (
                        <tr key={row[0]}>
                          {row.map((dayNumber) => (
                            <td key={dayNumber} onClick={() => formik.setFieldValue('day', dayNumber)}>
                              {dayNumber}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                />
                {!formik.errors.year ? formik.errors.month && formik.touched.month && (
                  <p className="errorMessage">{formik.errors.month}</p>
                ) : ''}
              </div>
              <div className="dropdown-date">
                <button type="button" className="dropbtn">
                  <ChevronDown className="w-4 h-6" />
                </button>
                <div className="dropdown-content">
                  <table>
                    <tbody>
                      {createMonths().map((row) => (
                        <tr key={row[0]}>
                          {row.map((monthName) => (
                            <td key={monthName} onClick={() => formik.setFieldValue('month', monthName)}>
                              {monthName}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                />
                {formik.errors.year && formik.touched.year && (
                  <p className="errorMessage">{formik.errors.year}</p>
                )}
              </div>
              <div className="dropdown-date">
                <button type="button" className="dropbtn">
                  <ChevronDown className="w-4 h-6" />
                </button>
                <div className="dropdown-content" style={{ alignItems: 'center' }}>
                  <div className="chevron"><ChevronLeft onClick={prevPage} className="w-6 h-6 mt+5 ml-2" /></div>
                  <div className="yearsTable">
                    <table>
                      <tbody>
                        {createYears().map((row) => (
                          <tr key={row[0]}>
                            {row.map((yearNumber) => (
                              <td key={yearNumber} onClick={() => formik.setFieldValue('year', yearNumber)}>
                                {yearNumber}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="chevron"><ChevronRight onClick={nextPage} className="w-6 h-6 mt+5 ml-2" /></div>
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
  onChange: PropTypes.func.isRequired,
};

DatePicker2.defaultProps = {
  value: undefined,
};


export default DatePicker2;
