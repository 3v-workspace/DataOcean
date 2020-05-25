/* global $ */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FormikPropType from 'utils/formik-prop-types';
import moment from 'moment';

// TODO: finish this
const DateInput = (props) => {
  const {
    name, formik, onChange, value,
  } = props;

  const datepickerRef = useRef();

  useEffect(() => {
    $(datepickerRef.current).daterangepicker({
      timePicker: true,
      timePicker24Hour: true,
      autoApply: true,
      autoUpdateInput: true,
      singleDatePicker: true,
      startDate: moment().startOf('hour'),
      endDate: moment().endOf('hour'),
      locale: {
        format: 'DD.MM.YYYY HH:mm',
        applyLabel: 'Oк',
        cancelLabel: 'Відміна',
        fromLabel: 'Від',
        toLabel: 'До',
        // customRangeLabel: 'Користувацька',
        weekLabel: 'Тиж.',
        daysOfWeek: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: [
          'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
          'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
        ],
        firstDay: 1,
      },
    });
    if (onChange) {
      $(datepickerRef.current).on('change', onChange);
    } else if (formik) {
      $(datepickerRef.current).on('change', (e) => {
        if (!formik.touched[name]) {
          formik.setFieldTouched(name, true);
        }
        formik.handleChange(e);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div>
      <input
        ref={datepickerRef}
        name={name}
        value={value || (formik && formik.values[name])}
        onBlur={formik && formik.handleBlur}
        className="input w-56 border block"
      />
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formik: FormikPropType,
};
DateInput.defaultProps = {
  value: undefined,
  onChange: undefined,
  formik: null,
};


export default DateInput;
