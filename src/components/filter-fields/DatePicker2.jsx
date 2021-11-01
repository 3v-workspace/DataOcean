import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import moment from 'moment';
import { Form } from '../form-components';


const months = [
  ['january', 'february', 'march'],
  ['april', 'may', 'june'],
  ['july', 'august', 'september'],
  ['october', 'november', 'december'],
];

const monthArr = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];


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
const days = createDays();


const DatePicker2 = (props) => {
  const { name, onChange, placeholder, maxYear, minYear } = props;
  const { t } = useTranslation();

  const [placeholderValue, setPlaceholderValue] = useState(placeholder);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [isShowDropdownContent, setShowDropdownContent] = useState('none');
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const formik = useFormik({
    initialValues: {
      day: '',
      month: '',
      year: '',
    },
    validationSchema: Yup.object({
      month: Yup
        .string()
        .test('value', t('needDayOrYear'), (value) => (formik.values.year || formik.values.day))
        .test('value', t('wrongMonthName'), (value) => (moment(value, ['M', 'MM', 'MMM', 'MMMM']).lang(['en', 'uk']).isValid()) || !value),
      year: Yup
        .number()
        .typeError(t('shouldDigit'))
        .min(minYear, t('minYear', { year: minYear }))
        .max(maxYear, t('maxYear', { year: maxYear })),
      day: Yup
        .number()
        .typeError(t('shouldDigit'))
        .min(1, t('wrongDateFormat'))
        .max(31, t('wrongDateFormat'))
        .test('', t('nonExistentDay'), (value) => {
          if (value && formik.values.year && formik.values.month) {
            let data = formik.values.year;
            data += '-';
            data += moment().month(formik.values.month).lang(['en', 'uk']).format('MM');
            data += '-';
            data += value;
            return moment(data).isValid();
          }
          return true;
        })
        .test('value', t('needMonthOrYear'), (value) => (formik.values.year || formik.values.month)),
    }),
    onSubmit: (values) => {
      let data = formik.values.year;
      if (formik.values.year && (formik.values.month || formik.values.day)) {
        data += '-';
      }
      if (formik.values.month) {
        if (formik.values.month.length < 3) {
          data += (moment().month(Number(formik.values.month) - 1).lang(['en', 'uk']).format('MM'));
        } else {
          data += moment().month(formik.values.month).lang(['en', 'uk']).format('MM');
        }
        if (formik.values.day) {
          data += '-';
        }
      } else if (formik.values.day) {
        data += 'XX-';
      }
      let format = '';
      if (formik.values.day) {
        format = format.concat('D ');
        if (formik.values.day.toString().length < 2) {
          data += '0';
        }
        data += formik.values.day;
      }

      if (formik.values.month) {
        format = format.concat('MMM ');
      }

      if (formik.values.year) {
        format = format.concat('YYYY');
      }

      setPlaceholderValue(moment(data, ['MM-D', 'YYYY-MM-D', 'YYYY-MM', 'YYYY-??-D']).format(format));

      onChange(name, data);
    },
  });

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


  return (
    <>
      <div className="search sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value=""
          placeholder={placeholderValue}
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
        <Form className="datepicker-form" formik={formik}>
          <div className="summary-datepicker-container">
            <div className="input-container">
              <div className="input-day-container">
                <input
                  autoComplete="off"
                  className="input-day"
                  type="text"
                  size="2"
                  placeholder="XX"
                  name="day"
                  onChange={formik.handleChange}
                  onFocus={() => {
                    setShowDropdownContent('day');
                  }}
                  value={formik.values.day}
                />
                {!(formik.errors.year || formik.errors.month) ?
                  formik.errors.day && formik.touched.day && (
                  <p className="errorMessageDay">{formik.errors.day}</p>
                  ) : ''}
              </div>
              <div className="dropdown-date" onBlur={() => setShowDropdownContent('none')}>
                <div className="dropdown-content" style={{ display: (isShowDropdownContent === 'day') ? 'flex' : 'none' }}>
                  <table>
                    <tbody>
                      {days.map((row) => (
                        <tr key={row[0]}>
                          {row.map((dayNumber) => (
                            <td
                              key={dayNumber}
                              className="day-cell"
                              onClick={() => {
                                formik.setFieldValue('day', dayNumber);
                                setShowDropdownContent('none');
                              }}
                            >
                              {dayNumber}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="input-month-container">
                <input
                  autoComplete="off"
                  className="input-month"
                  type="text"
                  size="8"
                  name="month"
                  placeholder={t('month')}
                  onChange={formik.handleChange}
                  onFocus={() => {
                    setShowDropdownContent('month');
                  }}
                  value={formik.values.month}
                />
                {!formik.errors.year ? formik.errors.month && formik.touched.month && (
                  <p className="errorMessageMonth">{formik.errors.month}</p>
                ) : ''}
              </div>
              <div className="dropdown-date" onBlur={() => setShowDropdownContent('none')}>
                <div className="dropdown-content" style={{ display: (isShowDropdownContent === 'month') ? 'flex' : 'none' }}>
                  <table>
                    <tbody>
                      {months.map((row) => (
                        <tr key={row[0]}>
                          {row.map((monthName) => (
                            <td
                              key={monthName}
                              className="cell"
                              onClick={() => {
                                formik.setFieldValue('month', t(monthName));
                                setShowDropdownContent('none');
                              }}
                            >
                              {t(monthName)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="input-year-container">
                <input
                  autoComplete="off"
                  className="input-year"
                  type="text"
                  size="4"
                  placeholder="XXXX"
                  name="year"
                  onChange={formik.handleChange}
                  onFocus={() => {
                    setShowDropdownContent('year');
                  }}
                  value={formik.values.year}
                />
                {formik.errors.year && formik.touched.year && (
                  <p className="errorMessageYear">{formik.errors.year}</p>
                )}
              </div>
              <div className="dropdown-date" onBlur={() => setShowDropdownContent('none')}>
                <div className="dropdown-content" style={{ alignItems: 'center', display: (isShowDropdownContent === 'year') ? 'flex' : 'none' }}>
                  <div className="chevron">
                    <ChevronLeft onClick={() => setCurrentYear(currentYear - 20)} className="w-4 h-6 mt+6 ml-1" />
                  </div>
                  <div className="years-table">
                    <table>
                      <tbody>
                        {createYears().map((row) => (
                          <tr key={row[0]}>
                            {row.map((yearNumber) => (
                              <td
                                key={yearNumber}
                                className="cell"
                                onClick={() => {
                                  formik.setFieldValue('year', yearNumber);
                                  setShowDropdownContent('none');
                                }}
                              >
                                {yearNumber}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="chevron">
                    <ChevronRight onClick={() => setCurrentYear(currentYear + 20)} className="w-4 h-6 mt+6 ml-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="button" onClick={() => formik.resetForm()} className="cancel-button">{t('cancel')}</button>
              <button type="submit" className="ok-button">OK</button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

DatePicker2.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
};

DatePicker2.defaultProps = {
  placeholder: '',
};


export default DatePicker2;
