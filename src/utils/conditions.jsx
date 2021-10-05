import Tooltip from 'components/Tooltip';
import { renderDate } from 'utils/dateTime';
import React from 'react';
import i18next from 'i18next';

export function renderCondition(row) {
  const endCrimeaOccupation = 'До закінчення терміну окупації АР Крим';
  if (row.end_date === null && row.cancellation_condition.startsWith(endCrimeaOccupation)) {
    return (
      <Tooltip
        content={i18next.t('afterCrimeaLiberationCondition')}
        position="bottom"
      >
        {i18next.t('afterCrimeaLiberation')}
      </Tooltip>
    );
  }
  return renderDate(row.end_date);
}
