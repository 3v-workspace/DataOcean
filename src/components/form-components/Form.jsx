import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
  const {
    children, noValidate, className, formik, onSubmit,
  } = props;

  const classList = [];
  if (className) {
    classList.push(className);
  }
  if (!noValidate) {
    classList.push('validate-form');
  }

  return (
    <form
      className={classList.join(' ')}
      onSubmit={onSubmit || formik.handleSubmit}
      onReset={formik.handleReset}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
  }),
  noValidate: PropTypes.bool,
};
Form.defaultProps = {
  onSubmit: undefined,
  className: '',
  noValidate: false,
  formik: undefined,
};

export default Form;
