import PropTypes from 'prop-types';

export const FormikPropType = PropTypes.shape({
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

export const ReactRouterPropTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
  }),
  history: PropTypes.object,
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
    key: PropTypes.string,
  }),
};
