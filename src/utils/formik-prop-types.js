import PropTypes from 'prop-types';

// TODO: extend this prop types
const FormikPropType = PropTypes.shape({
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,

  setTouched: PropTypes.func.isRequired,

  setFieldTouched: PropTypes.func.isRequired,
});

export default FormikPropType;
