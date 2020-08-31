import React from 'react';
import PropTypes from 'prop-types';

const PieChartLegendItem = (props) => {
  const { label, value, mt, bgColor } = props;
  return (
    <div className={`flex items-center ${mt ? 'mt-4' : ''}`}>
      <div
        className="w-2 h-2 rounded-full mr-3"
        style={{ backgroundColor: bgColor }}
      />
      <span className="truncate">{label}</span>
      <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
      <span className="font-medium xl:ml-auto">{value}</span>
    </div>
  );
};

PieChartLegendItem.propTypes = {
  mt: PropTypes.bool,
  bgColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};
PieChartLegendItem.defaultProps = {
  mt: false,
};

export default PieChartLegendItem;
