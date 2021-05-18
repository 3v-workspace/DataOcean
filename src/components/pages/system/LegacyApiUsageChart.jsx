import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Api from 'api';
import { useTranslation } from 'react-i18next';

const LegacyApiUsageChart = (props) => {
  const [apiUsageData, setApiUsageData] = useState({});
  const { t } = useTranslation();

  const fetchData = () => {
    Api.get('stats/api-usage/me/')
      .then((resp) => {
        setApiUsageData(resp.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initApiUsageChart = () => {
    const labels = apiUsageData.days.map((el) => moment(el.timestamp).format('DD.MM'));
    const data = apiUsageData.days.map((el) => el.count);
    if ($('#api-usage-chart').length) {
      const ctx = $('#api-usage-chart')[0].getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: t('apiRequests'),
              data,
              borderWidth: 2,
              borderColor: '#3160D8',
              backgroundColor: 'transparent',
              pointBorderColor: 'transparent',
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: '12',
                fontColor: '#777777',
              },
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              ticks: {
                fontSize: '12',
                fontColor: '#777777',
                // callback(value) {
                //   return `$${value}`;
                // },
              },
              gridLines: {
                color: '#D8D8D8',
                zeroLineColor: '#D8D8D8',
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: false,
              },
            }],
          },
        },
      });
    }
  };

  useEffect(() => {
    if (Object.keys(apiUsageData).length) {
      initApiUsageChart();
    }
  }, [apiUsageData]);

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-center">
        <div className="flex">
          <div>
            <div className="text-theme-20 text-lg xl:text-xl font-bold">
              {apiUsageData.current_month || 0}
            </div>
            <div className="text-gray-600">{t('thisMonth')}</div>
          </div>
          <div className="w-px h-12 border border-r border-dashed border-gray-300 mx-4 xl:mx-6" />
          <div>
            <div className="text-gray-600 text-lg xl:text-xl font-medium">
              {apiUsageData.prev_month || 0}
            </div>
            <div className="text-gray-600">{t('previousMonth')}</div>
          </div>
        </div>
      </div>
      <div> {/* className="report-chart"> */}
        <canvas id="api-usage-chart" height="160" className="mt-6" />
      </div>
    </>
  );
};

LegacyApiUsageChart.propTypes = {};

export default LegacyApiUsageChart;
