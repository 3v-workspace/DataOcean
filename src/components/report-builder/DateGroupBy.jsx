import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DateInput, SelectInput } from 'components/form-components';

const groupByChoices = [
  { label: 'Рік', value: 'year' },
  { label: 'Місяць', value: 'month' },
  { label: 'День', value: 'day' },
];

const DateGroupBy = (props) => {
  const { onGroupByChange } = props;
  const [timeRange, setTimeRange] = useState('');
  const [groupBy, setGroupBy] = useState(null);

  useEffect(() => {
    onGroupByChange({ timeRange, groupBy });
  }, [timeRange, groupBy]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <SelectInput
          name="aggregation"
          options={groupByChoices}
          // formik={formik}
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          hideSearch
        />
      </div>
      <div className="col-span-8">
        <DateInput
          singleDatePicker={false}
          name="timeRange"
          // formik={formik}
          value={timeRange}
          onChange={(n, v) => setTimeRange(v)}
        />
      </div>
    </div>
  );
};

DateGroupBy.propTypes = {
  onGroupByChange: PropTypes.func.isRequired,
};

export default DateGroupBy;
