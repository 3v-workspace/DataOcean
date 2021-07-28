import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormikPropType } from 'utils/prop-types';
import moment from 'moment';
import { DATE_FORMAT, DATETIME_FORMAT, DATE_FORMAT_ENG, DATETIME_FORMAT_ENG } from 'const/const';
import { useTranslation } from 'react-i18next';
import { DateFormat, DateTimeFormat } from '../../utils';

// TODO: finish this
const DateInput = (props) => {
  const {
    name, formik, onChange, value, timePicker, timePicker24Hour,
    autoApply, singleDatePicker, startDate, endDate, autoUpdateInput,
    minDate, maxDate, drops, id, label, containerClass, className,
    required, placeholder, onKeyPress, onApply,
  } = props;

  const { i18n } = useTranslation();
  const datepickerRef = useRef();
  const isoFormat = timePicker ? DateTimeFormat(i18n.language) : DateFormat(i18n.language);
  const format = timePicker ? DateTimeFormat(i18n.language) : DateFormat(i18n.language);
  const val = value || (formik && formik.values[name]);

  useEffect(() => {
    let val2 = '';
    if (val) {
      if (singleDatePicker) {
        val2 = moment(val, isoFormat).format(format);
      } else {
        const [from, to] = val.split(' - ');
        val2 = `${moment(from, isoFormat).format(format)} - ${moment(to, isoFormat).format(format)}`;
      }
    }
    $(datepickerRef.current).val(val2);
  }, [val]);

  useEffect(() => {
    const opt = {
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
        firstDay: 1,
      },
    };
    if (i18n.language !== 'en') {
      opt.locale = {
        ...opt.locale,
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
      };
    }
    $(datepickerRef.current).daterangepicker(opt, (start, end) => {
      const valueStr = singleDatePicker ? (
        start.format(isoFormat)
      ) : (
        `${start.format(isoFormat)} - ${end.format(isoFormat)}`
      );
      if (onChange) {
        onChange(name, valueStr);
      } else if (formik) {
        formik.setFieldValue(name, valueStr);
      }
    });
    $(datepickerRef.current).on('apply.daterangepicker', (e, picker) => {
      let newValue;
      // if (!e.target.value) {
      //   $(e.target).val('');
      // }
      if (singleDatePicker) {
        newValue = picker.startDate.format(format);
      } else {
        newValue = `${picker.startDate.format(format)} - ${picker.endDate.format(format)}`;
      }
      if (onApply) {
        onApply(name, newValue);
      }
      $(e.target).val(newValue);
    });
    $(datepickerRef.current).on('change', (e) => {
      const input = $(e.target);
      const drp = input.data('daterangepicker');
      if (e.target.value) {
        if (singleDatePicker) {
          input.val(drp.startDate.format(format));
        } else {
          input.val(`${drp.startDate.format(format)} - ${drp.endDate.format(format)}`);
        }
      } else {
        formik.setFieldValue(name, null);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const endId = id || `id_${name}`;

  return (
    <div className={`${containerClass} mb-3`}>
      {label && (
        <label htmlFor={endId} className="mb-2 inline-block">
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
      )}
      <input
        id={endId}
        ref={datepickerRef}
        autoComplete="off"
        className={`${className} input border`}
        name={name}
        required={required}
        placeholder={placeholder}
        // value={value || (formik && formik.values[name])}
        onBlur={formik && formik.handleBlur}
        onKeyPress={onKeyPress}
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
  onKeyPress: PropTypes.func,
  onApply: PropTypes.func,
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
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};
DateInput.defaultProps = {
  id: null,
  value: '',
  onChange: undefined,
  onKeyPress: undefined,
  onApply: undefined,
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
  required: false,
  placeholder: '',
};


export default DateInput;
