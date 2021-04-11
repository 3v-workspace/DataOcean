import React, { useEffect, useState } from 'react';
import {
  Briefcase, Database, File, User,
} from 'react-feather';
import ReportBox from 'components/pages/dashboard/ReportBox';
import Api from 'api';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import KvedChart from 'components/pages/dashboard/KvedChart';
import CompanyChart from 'components/pages/dashboard/CompanyChart';

const chartsTypes = {
  KVED: 'KVED',
  COMPANY: 'COMPANY',
};

const charts = {
  [chartsTypes.KVED]: <KvedChart />,
  [chartsTypes.COMPANY]: <CompanyChart />,
};

const HomePage = ({ history }) => {
  const { t } = useTranslation();
  const [registersCount, setRegistersCount] = useState('');
  const [usersCount, setUsersCount] = useState('');
  const [fopCount, setFopCount] = useState('');
  const [companyCount, setCompanyCount] = useState('');
  const [apiUsageData, setApiUsageData] = useState({});
  const [project, setProject] = useState({});

  const [visibleChart, setVisibleChart] = useState(chartsTypes.KVED);

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

  const fetchData = () => {
    Api.get('register/')
      .then((resp) => {
        setRegistersCount(resp.data.count);
      });
    Api.get('stats/count-users/')
      .then((resp) => {
        setUsersCount(resp.data.users_count);
      });
    Api.get('stats/count-registered-companies/')
      .then((resp) => {
        setCompanyCount(resp.data.company_count);
      });
    Api.get('stats/count-registered-fops/')
      .then((resp) => {
        setFopCount(resp.data.company_count);
      });
    Api.get('stats/api-usage/me/')
      .then((resp) => {
        setApiUsageData(resp.data);
      });
    Api.get('payment/project/')
      .then((resp) => {
        setProject(resp.data.find((projects) => projects.is_default));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                {t('generalReport')}
              </h2>
              {/*<a href="#" className="ml-auto flex text-theme-1 dark:text-theme-10">*/}
              {/*  <RefreshCcw className="w-4 h-4 mr-3" /> {t('refresh')}*/}
              {/*</a>*/}
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfCompanies')}
                  value={companyCount.toLocaleString()}
                  subText="18%"
                  subTextDirection="up"
                  icon={<File className="report-box__icon text-theme-10" />}
                  onClick={() => history.push('/system/datasets/company/')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfSoleProprietors')}
                  value={fopCount.toLocaleString()}
                  subText="16%"
                  subTextDirection="up"
                  icon={<Briefcase className="report-box__icon text-theme-11" />}
                  onClick={() => history.push('/system/datasets/fop/')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfDatasets')}
                  value={registersCount.toLocaleString()}
                  subText="+5"
                  subTextDirection="up"
                  icon={<Database className="report-box__icon text-theme-12" />}
                  onClick={() => history.push('/system/datasets/')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfUsers')}
                  value={usersCount.toLocaleString()}
                  subText="+7"
                  subTextDirection="up"
                  icon={<User className="report-box__icon text-theme-9" />}
                  onClick={() => history.push(`/system/profile/projects/${project.id}/`)}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-8">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                {t('apiUsage')}
              </h2>
              {/*<div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700">*/}
              {/*  <Calendar className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    data-daterange="true"*/}
              {/*    className="datepicker input w-full sm:w-56 box pl-10"*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
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
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-8">
            <div>
              <div className="row intro-y flex items-center h-10 cursor-pointer">
                <div
                  className={`${visibleChart === chartsTypes.KVED ? 'px-4 pt-4 pb-4 mt-4 bg-white active' : 'px-4 pt-4 pb-4 mt-4'}`}
                  onClick={() => setVisibleChart(chartsTypes.KVED)}
                >
                  <h2 className="text-lg font-medium">
                    {t('topKveds')}
                  </h2>
                </div>
                <div
                  className={`${visibleChart === chartsTypes.COMPANY ? 'px-4 pt-4 pb-4 mt-4 bg-white active' : 'px-4 pt-4 pb-4 mt-4 '}`}
                  onClick={() => setVisibleChart(chartsTypes.COMPANY)}
                >
                  <h2 className="text-lg font-medium">
                    {t('topCompanies')}
                  </h2>
                </div>
              </div>
              <div>
                {charts[visibleChart]}
              </div>
            </div>
          </div>
          {/*<UnusedSections />*/}
        </div>
        {/*<Transactions />*/}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default HomePage;
