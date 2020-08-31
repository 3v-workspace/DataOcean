import React from 'react';
import PropTypes from 'prop-types';
import PieChartLegendItem from './PieChartLegendItem';

const colorPallet = [
  '#FF8B26', '#FFC533', '#285FD3', '#003c5c', '#33477a',
  '#6a4d8d', '#6a4d8d', '#d54e82', '#f85c66', '#ff7c41',
];

const PieChartLegend = (props) => {
  const { items } = props;

  const sum = items.reduce((r, el) => r + el.value, 0);
  const calculated = items.slice(0, 3)
    .map((el) => ({
      ...el,
      value: Math.round((el.value / sum) * 100),
    }));

  return (
    <div className="mt-8">
      {calculated.map((el, i) => (
        <PieChartLegendItem
          key={el.label}
          mt={i !== 0}
          value={`${el.value}%`}
          label={el.label}
          bgColor={colorPallet[i]}
        />
      ))}
    </div>
  );
};

PieChartLegend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default PieChartLegend;
