import React, { useEffect, useState } from 'react';
import PieChartLegend from 'components/pages/dashboard/PieChartLegend';
import { upFirstLetter } from 'utils';
import Api from 'api';

const KvedChart = () => {
  const [topKvedData, setTopKvedData] = useState([]);

  const initTopKvedPie = () => {
    const labels = topKvedData.map((el) => el.kved.code);
    const data = topKvedData.map((el) => el.count_companies_with_kved);

    if ($('#top-kved-chart').length) {
      const ctx = $('#top-kved-chart')[0].getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: [
              '#FF8B26', '#FFC533', '#285FD3', '#003c5c', '#33477a',
              '#6a4d8d', '#6a4d8d', '#d54e82', '#f85c66', '#ff7c41',
            ],
            hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
            borderWidth: 2,
            borderColor: '#fff',
          }],
        },
        options: {
          legend: {
            display: false,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (topKvedData.length) {
      initTopKvedPie();
    }
  }, [topKvedData]);

  const fetchData = () => {
    Api.get('stats/top-kved/')
      .then((resp) => {
        setTopKvedData(resp.data.filter((el) => el.kved.code !== 'not_valid'));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="intro-y box p-5 mt-5">
      <canvas className="mt-3" id="top-kved-chart" height="115" />
      <PieChartLegend
        items={topKvedData.map((el) => ({
          label: `${el.kved.code}  ${upFirstLetter(el.kved.name)}`,
          value: el.count_companies_with_kved,
        }))}
      />
    </div>
  );
};

KvedChart.propTypes = {};

export default KvedChart;
