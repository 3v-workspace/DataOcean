/* global $ */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormikPropType } from 'utils/prop-types';
import moment from 'moment';
import { DATE_FORMAT, DATETIME_FORMAT } from 'const/const';

// TODO: finish this
const DateInput = (props) => {
  const {
    name, formik, onChange, value, timePicker, timePicker24Hour,
    autoApply, singleDatePicker, startDate, endDate, autoUpdateInput,
    minDate, maxDate, drops, id, label, containerClass, className,
  } = props;

  const datepickerRef = useRef();
  const isoFormat = timePicker ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
  const format = timePicker ? DATETIME_FORMAT : DATE_FORMAT;
  const val = value || (formik && formik.values[name]);

  useEffect(() => {
    const val2 = val ? moment(val, isoFormat).format(format) : '';
    $(datepickerRef.current).val(val2);
  }, [val]);

  useEffect(() => {
    $(datepickerRef.current).daterangepicker(
      {
        timePicker,
        timePicker24Hour,
        autoApply,
        singleDatePicker,
        startDate,
        endDate,
        minDate,
        maxDate,
        autoUpdateInput,
        drops,
        locale: {
          format,
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
      },
      (start) => {
        const event = {
          target: {
            value: start.format(isoFormat),
            name,
          },
        };
        if (onChange) {
          onChange(event);
        } else {
          formik.handleChange(event);
        }
      },
    );
    $(datepickerRef.current).on('apply.daterangepicker', (e, picker) => {
      if (!e.target.value) {
        $(e.target).val('');
      } else if (singleDatePicker) {
        $(e.target).val(picker.startDate.format(format));
      } else {
        $(e.target).val(`${picker.startDate.format(format)} - ${picker.endDate.format(format)}`);
      }
    });
    $(datepickerRef.current).on('change', (e) => {
      if (e.target.value) {
        $(e.target).val($(e.target).data('daterangepicker').startDate.format(format));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const endId = id || `id_${name}`;

  return (
    <div className={`${containerClass} mb-3`}>
      {label && (
        <label htmlFor={endId}>{label}</label>
      )}
      <input
        id={endId}
        ref={datepickerRef}
        autoComplete="off"
        className={`${className} input border mt-2`}
        name={name}
        // value={value || (formik && formik.values[name])}
        onBlur={formik && formik.handleBlur}
      />
      {formik && formik.touched[name] && formik.errors[name] && (
        <label className="error" htmlFor={endId}>{formik.errors[name]}</label>
      )}
    </div>
  );
};

DateInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  label: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  onChange: PropTypes.func,
  timePicker: PropTypes.bool,
  timePicker24Hour: PropTypes.bool,
  autoApply: PropTypes.bool,
  autoUpdateInput: PropTypes.bool,
  singleDatePicker: PropTypes.bool,
  startDate: PropTypes.oneOfType([
    PropTypes.string, PropTypes.instanceOf(moment),
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.string, PropTypes.instanceOf(moment),
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string, PropTypes.instanceOf(moment),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string, PropTypes.instanceOf(moment),
  ]),
  drops: PropTypes.oneOf(['down', 'up', 'auto']),

  formik: FormikPropType,
};
DateInput.defaultProps = {
  id: null,
  value: '',
  onChange: undefined,
  formik: undefined,
  label: '',
  className: 'w-full',
  containerClass: '',

  timePicker: false,
  timePicker24Hour: false,
  autoApply: true,
  autoUpdateInput: false,
  singleDatePicker: true,
  startDate: moment().startOf('day'),
  endDate: moment().endOf('day'),
  minDate: undefined,
  maxDate: undefined,
  drops: 'auto',
};


export default DateInput;
