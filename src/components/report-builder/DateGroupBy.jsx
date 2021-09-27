import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DateInput, SelectInput } from 'components/form-components';
import { useTranslation } from 'react-i18next';


const DateGroupBy = (props) => {
  const { onGroupByChange } = props;
  const [timeRange, setTimeRange] = useState('');
  const [groupBy, setGroupBy] = useState(null);

  const { t } = useTranslation();

  const groupByChoices = [
    { label: t('year'), value: 'year' },
    { label: t('month'), value: 'month' },
    { label: t('day'), value: 'day' },
  ];

  useEffect(() => {
    const [date_from, date_to] = timeRange.split(' - ');
    onGroupByChange({ date_from, date_to, group_by: groupBy });
  }, [timeRange, groupBy]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <SelectInput
          required
          name="aggregation"
          options={groupByChoices}
          // formik={formik}
          value={groupBy}
          onChange={(n, v) => setGroupBy(v)}
          hideSearch
        />
      </div>
      <div className="col-span-8">
        <DateInput
          required
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
