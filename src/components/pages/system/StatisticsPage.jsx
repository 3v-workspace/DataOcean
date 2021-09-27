import React, { useEffect, useState } from 'react';
import {
  Briefcase, Database, File, User,
} from 'react-feather';
import ReportBox from 'components/pages/dashboard/ReportBox';
import Api from 'api';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import KvedChart from 'components/pages/dashboard/KvedChart';
import CompanyChart from 'components/pages/dashboard/CompanyChart';
import ApiUsageChart from 'components/pages/system/ApiUsageChart';

const chartsTypes = {
  KVED: 'KVED',
  COMPANY: 'COMPANY',
};

const charts = {
  [chartsTypes.KVED]: <KvedChart />,
  [chartsTypes.COMPANY]: <CompanyChart />,
};

const StatisticsPage = ({ history }) => {
  const { t, i18n } = useTranslation();
  const [registersCount, setRegistersCount] = useState('');
  const [usersCount, setUsersCount] = useState('');
  const [fopCount, setFopCount] = useState('');
  const [companyCount, setCompanyCount] = useState('');
  const [project, setProject] = useState({});

  const [visibleChart, setVisibleChart] = useState(chartsTypes.KVED);

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
                  value={companyCount.toLocaleString(`${i18n.language}`)}
                  subText="18%"
                  subTextDirection="up"
                  icon={<File className="report-box__icon text-theme-10" />}
                  onClick={() => history.push('/system/datasets/company/')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfSoleProprietors')}
                  value={fopCount.toLocaleString(`${i18n.language}`)}
                  subText="16%"
                  subTextDirection="up"
                  icon={<Briefcase className="report-box__icon text-theme-11" />}
                  onClick={() => history.push('/system/datasets/fop/')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfDatasets')}
                  value={registersCount.toLocaleString(`${i18n.language}`)}
                  subText="+5"
                  subTextDirection="up"
                  icon={<Database className="report-box__icon text-theme-12" />}
                  onClick={() => history.push('/system/datasets/')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label={t('numberOfUsers')}
                  value={usersCount.toLocaleString(`${i18n.language}`)}
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
              <ApiUsageChart project={project} />
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

StatisticsPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default StatisticsPage;
