/* global $ */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FormikPropType from 'utils/formik-prop-types';

// TODO: finish this
const DateInput = (props) => {
  const {
    name, formik, onChange,
  } = props;

  const datepickerRef = useRef();

  useEffect(() => {
    $(datepickerRef.current).daterangepicker({
      timePicker: true,
      singleDatePicker: true,
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
        data-timepicker="true"
        className="input w-56 border block"
      />
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  formik: FormikPropType,
};
DateInput.defaultProps = {
  onChange: undefined,
  formik: null,
};


export default DateInput;
