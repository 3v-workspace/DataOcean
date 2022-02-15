import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { Form } from '../form-components';

const months = [
  ['january', 'february', 'march'],
  ['april', 'may', 'june'],
  ['july', 'august', 'september'],
  ['october', 'november', 'december'],
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
  const { name, onChange, placeholder, maxYear, minYear, value, tableScrollParam } = props;
  const { t } = useTranslation();

  const monthRef = useRef();
  const yearRef = useRef();
  const okRef = useRef();

  const [inputValue, setInputValue] = useState(value);

  const [isShowDropdown, setShowDropdown] = useState(false);
  const [isShowDropdownContent, setShowDropdownContent] = useState('none');
  const [domReady, setDomReady] = useState(false);
  const [offsetParams, setOffsetParams] = useState({
    left: 0, top: 0, height: 0,
  });
  const selectInputRef = useRef();
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const portalContainer = document.getElementById('div_for_dropdown');

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
        .test('value', t('wrongMonthName'), (value) => (
          moment(value, ['M', 'MM', 'MMM', 'MMMM'], 'uk').isValid() ||
          moment(value, ['M', 'MM', 'MMM', 'MMMM'], 'en').isValid()) || !value),
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
            data += moment().month(formik.values.month).locale(['en', 'uk']).format('MM');
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
          data += (moment().month(Number(formik.values.month) - 1).locale(['en', 'uk']).format('MM'));
        } else {
          if (moment(formik.values.month, ['M', 'MM', 'MMM', 'MMMM'], 'uk').month(formik.values.month).isValid()) {
            data += moment(formik.values.month, ['M', 'MM', 'MMM', 'MMMM'], 'uk').month(formik.values.month).locale(['uk', 'en']).format('MM');
          }
          if (moment(formik.values.month, ['M', 'MM', 'MMM', 'MMMM'], 'en').month(formik.values.month).isValid()) {
            data += moment(formik.values.month, ['M', 'MM', 'MMM', 'MMMM'], 'en').month(formik.values.month).locale(['uk', 'en']).format('MM');
          }
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
        format = format.concat('MMMM ');
      } else if (formik.values.day && formik.values.year) {
        format = format.concat('--- ');
      }

      if (formik.values.year) {
        format = format.concat('YYYY');
      }


      setInputValue(moment(data, ['MM-D', 'YYYY-MM-D', 'YYYY-MM', 'YYYY-??-D']).format(format));

      onChange(name, data);
      setShowDropdown(false);
    },
  });

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

  function createYears() {
    const year = new Array(5);
    let n = currentYear - 20;
    for (let i = 0; i < year.length; i += 1) {
      const row = new Array(4);
      for (let j = 0; j < row.length; j += 1) {
        row[j] = n;
        n += 1;
      }
      year[i] = row;
    }
    return year;
  }

  function dropCont(place, event) {
    if (place === 'none') {
      setShowDropdownContent('none');
    }
    if (event === 'click') {
      if (place === 'day') {
        if (isShowDropdownContent === 'day') {
          setShowDropdownContent('none');
        } else {
          setShowDropdownContent('none');
          setShowDropdownContent('day');
        }
      }
      if (place === 'month') {
        if (isShowDropdownContent === 'month') {
          setShowDropdownContent('none');
        } else {
          setShowDropdownContent('none');
          setShowDropdownContent('month');
        }
      }
      if (place === 'year') {
        if (isShowDropdownContent === 'year') {
          setShowDropdownContent('none');
        } else {
          setShowDropdownContent('none');
          setShowDropdownContent('year');
        }
      }
    } else {
      setShowDropdownContent(place);
    }
  }

  const outsideClickListener = (event) => {
    const $target = $(event.target);
    let state = false;
    if (isShowDropdown) {
      Object.entries($target.parents()).forEach((parent) => {
        if ((document.getElementsByClassName('datepicker-form')[0] === parent[1])) {
          state = true;
        }
        return parent;
      });
    }
    if ((isShowDropdown) && (state === false)) {
      setShowDropdownContent('none');
      setShowDropdown(false);
      document.removeEventListener('click', outsideClickListener);
    }
  };

  useEffect(() => {
    if (isShowDropdown) {
      document.addEventListener('click', outsideClickListener);
    } else {
      document.removeEventListener('click', outsideClickListener);
    }
  }, [isShowDropdown]);

  useEffect(() => {
    if (value === '') {
      setInputValue(value);
      formik.resetForm();
    } else {
      if (value.length === 10) {
        const date = moment(value, ['YYYY-MM-D', 'YYYY-??-D']).locale('en');
        formik.values.day = date.format('D');
        if (value.charAt(5) !== 'X') {
          formik.values.month = t(date.format('MMMM').toLowerCase());
        }
        formik.values.year = date.format('YYYY');
      }
      if (value.length === 7) {
        const date = moment(value, ['YYYY-MM']).locale('en');
        formik.values.month = t(date.format('MMMM').toLowerCase());
        formik.values.year = date.format('YYYY');
      }
      if (value.length === 5) {
        const date = moment(value, ['MM-D']).locale('en');
        formik.values.month = t(date.format('MMMM').toLowerCase());
        formik.values.day = date.format('D');
      }
      if (value.length === 4) {
        const date = moment(value, ['YYYY']);
        formik.values.year = date.format('YYYY');
      }
      formik.submitForm();
    }
  }, [value]);

  const handleClick = () => {
    setTimeout(() => {
      if (isShowDropdown === false) {
        setOffsetParams({
          left: selectInputRef.current.offsetLeft - tableScrollParam,
          top: selectInputRef.current.offsetTop,
          height: selectInputRef.current.offsetHeight,
        });
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 0);
  };

  const handleFocus = () => {
    setTimeout(() => {
      if (isShowDropdown === false) {
        setShowDropdown(true);
      }
    }, 0);
  };

  return (
    <>
      <div ref={selectInputRef} className="search sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-900 w-40"
          value={inputValue}
          placeholder={placeholder}
          onClick={() => handleClick()}
        />
        {isShowDropdown ? (
          <ChevronUp
            onClick={() => {
              setShowDropdown(false);
              setShowDropdownContent('none');
            }}
            className="search__icon cursor-pointer"
          />
        ) : (
          <ChevronDown
            onClick={() => {
              handleClick();
            }}
            className="search__icon cursor-pointer"
          />
        )}
      </div>
      {domReady ? ReactDOM.createPortal(
        <div
          className={`w-1/2 sm:w-auto mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
          style={{
            left: offsetParams.left,
            top: offsetParams.top + offsetParams.height,
          }}
        >
          <Form className="datepicker-form" formik={formik}>
            <div className="summary-datepicker-container">
              <div className="input-container">
                <div className="input-day-container search">
                  <input
                    autoComplete="off"
                    className="input-day"
                    type="text"
                    size="4"
                    placeholder="XX"
                    name="day"
                    onChange={(e) => { formik.handleChange(e); setShowDropdownContent('none'); }}
                    onMouseDown={() => {
                      dropCont('day', 'click');
                    }}
                    onFocus={() => {
                      dropCont('day', 'focus');
                    }}
                    value={formik.values.day}
                  />
                  {!(formik.errors.year || formik.errors.month) ?
                    formik.errors.day && formik.touched.day && (
                    <p className="errorMessageDay">{formik.errors.day}</p>
                    ) : ''}
                  {isShowDropdownContent !== 'day' ? (
                    <ChevronDown className="search__icon cursor-pointer" style={{ pointerEvents: 'none', marginRight: 0 }} />
                  ) : (
                    <ChevronUp className="search__icon cursor-pointer" style={{ pointerEvents: 'none', marginRight: 0 }} />
                  )}
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
                                  monthRef.current.focus();
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

                <div className="input-month-container search">
                  <input
                    autoComplete="off"
                    className="input-month"
                    type="text"
                    size="10"
                    ref={monthRef}
                    name="month"
                    placeholder={t('month')}
                    onChange={(e) => { formik.handleChange(e); setShowDropdownContent('none'); }}
                    onMouseDown={() => {
                      dropCont('month', 'click');
                    }}
                    onFocus={() => {
                      dropCont('month', 'focus');
                    }}
                    value={formik.values.month}
                  />
                  {!formik.errors.year ? formik.errors.month && formik.touched.month && (
                    <p className="errorMessageMonth">{formik.errors.month}</p>
                  ) : ''}
                  {isShowDropdownContent !== 'month' ? (
                    <ChevronDown className="search__icon cursor-pointer" style={{ pointerEvents: 'none', marginRight: 0 }} />
                  ) : (
                    <ChevronUp className="search__icon cursor-pointer" style={{ pointerEvents: 'none', marginRight: 0 }} />
                  )}
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
                                  yearRef.current.focus();
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

                <div className="input-year-container search">
                  <input
                    autoComplete="off"
                    className="input-year"
                    type="text"
                    size="6"
                    ref={yearRef}
                    placeholder="XXXX"
                    name="year"
                    onChange={(e) => { formik.handleChange(e); setShowDropdownContent('none'); }}
                    onMouseDown={() => {
                      dropCont('year', 'click');
                    }}
                    onFocus={() => {
                      dropCont('year', 'focus');
                    }}
                    value={formik.values.year}
                  />
                  {formik.errors.year && formik.touched.year && (
                    <p className="errorMessageYear">{formik.errors.year}</p>
                  )}
                  {isShowDropdownContent !== 'year' ? (
                    <ChevronDown className="search__icon cursor-pointer" style={{ pointerEvents: 'none', marginRight: 0 }} />
                  ) : (
                    <ChevronUp className="search__icon cursor-pointer" style={{ pointerEvents: 'none', marginRight: 0 }} />
                  )}
                </div>
                <div className="dropdown-date" onBlur={() => setShowDropdownContent('none')}>
                  <div className="dropdown-content" style={{ alignItems: 'stretch', display: (isShowDropdownContent === 'year') ? 'flex' : 'none' }}>
                    <div className="chevron-container" onClick={() => setCurrentYear(currentYear - 20)}>
                      <div className="chevron">
                        <ChevronLeft className="w-4 h-6 mt+6 ml-1" />
                      </div>
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
                                    okRef.current.focus();
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
                    <div className="chevron-container" onClick={() => setCurrentYear(currentYear + 20)}>
                      <div className="chevron">
                        <ChevronRight className="w-4 h-6 mt+6 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="button-container">
                <button
                  type="button"
                  onClick={() => {
                    document.removeEventListener('click', outsideClickListener);
                    formik.resetForm();
                    setInputValue('');
                    setShowDropdown(false);
                    onChange(name, '');
                  }}
                  className="cancel-button"
                >
                  {t('reset')}
                </button>
                <button type="submit" ref={okRef} className="ok-button">OK</button>
              </div>
            </div>
          </Form>
        </div>, portalContainer,
      ) : null}
    </>
  );
};

DatePicker2.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
  tableScrollParam: PropTypes.number,
};

DatePicker2.defaultProps = {
  placeholder: '',
  value: '',
  tableScrollParam: 0,
};


export default DatePicker2;
