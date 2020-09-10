import React from 'react';
import PropTypes from 'prop-types';
import DateGroupBy from './DateGroupBy';
import KvedGroupBy from './KvedGroupBy';

const RBGroupBy = (props) => {
  const { currentType, onGroupByChange } = props;

  if (currentType === 'date') {
    return <DateGroupBy onGroupByChange={onGroupByChange} />;
  }
  if (currentType === 'kved') {
    return <KvedGroupBy onGroupByChange={onGroupByChange} />;
  }
  return null;
};

RBGroupBy.propTypes = {
  currentType: PropTypes.oneOf(['date', 'kved']),
  onGroupByChange: PropTypes.func.isRequired,
};
RBGroupBy.defaultProps = {
  currentType: undefined,
};

export default RBGroupBy;
