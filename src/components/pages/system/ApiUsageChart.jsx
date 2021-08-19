import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ProgressChart from 'components/pages/system/ProgressChart';
import LoadingIcon from 'components/LoadingIcon';

const ApiUsageChart = (props) => {
  const { project } = props;
  const { t } = useTranslation();

  let requestsLimit = null;
  let requestsUsed = null;
  let requestsLeft = null;
  if (project.active_subscription) {
    requestsLimit = project.active_subscription.requests_limit;
    requestsLeft = project.active_subscription.requests_left;
    requestsUsed = requestsLimit - requestsLeft;
  }

  if (!Object.keys(project).length) {
    return (
      <div className="flex justify-center items-center h-56">
        <LoadingIcon icon="oval" />
      </div>
    );
  }

  return (
    <>
      <div className="pl-3">
        <div className="text-red-500 text-lg xl:text-xl font-bold">
          {requestsUsed}
        </div>
        <div className="text-gray-800">{t('apiRequestsUsedThisMonth')}</div>
        <div className="text-theme-9 mt-2 text-lg xl:text-xl font-medium">
          {requestsLeft}
        </div>
        <div className="text-gray-800">{t('apiRequestsLeftThisMonth')}</div>
      </div>
      <ProgressChart
        min={0}
        current={requestsUsed}
        max={requestsLimit}
      />
    </>
  );
};

ApiUsageChart.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ApiUsageChart;
