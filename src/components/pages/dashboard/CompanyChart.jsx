import React, { useEffect, useState } from 'react';
import PieChartLegend from 'components/pages/dashboard/PieChartLegend';
import { useTranslation } from 'react-i18next';
import { upFirstLetter } from 'utils';
import Api from 'api';

const CompanyChart = () => {
  const { i18n } = useTranslation();
  const [topCompanyTypeData, setTopCompanyTypeData] = useState([]);

  const getName = (item) => {
    if (i18n.language === 'uk') {
      return upFirstLetter(item.name || item.name_eng);
    }
    if (i18n.language === 'en') {
      return upFirstLetter(item.name_eng || item.name);
    }
    return '---';
  };

  const initTopCompanyTypesPie = () => {
    const labels = topCompanyTypeData.map((el) => getName(el));
    const data = topCompanyTypeData.map((el) => el.count_companies);

    if ($('#top-company-chart').length) {
      const ctx = $('#top-company-chart')[0].getContext('2d');
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
          //cutoutPercentage: 60,
        },
      });
    }
  };

  useEffect(() => {
    if (topCompanyTypeData.length) {
      initTopCompanyTypesPie();
    }
  }, [topCompanyTypeData]);

  const fetchData = () => {
    Api.get('stats/count-company-type/')
      .then((resp) => {
        setTopCompanyTypeData(resp.data.slice(0, 10));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="intro-y box p-5 mt-5">
      <canvas className="mt-3" id="top-company-chart" height="115" />
      <PieChartLegend
        items={topCompanyTypeData.map((el) => ({
          label: getName(el),
          value: el.count_companies,
        }))}
      />
    </div>
  );
};

CompanyChart.propTypes = {};

export default CompanyChart;
