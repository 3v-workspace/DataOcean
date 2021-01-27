import React, { useEffect, useState } from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import PageBox from 'components/pages/PageBox';
import Api from 'api';
import { Eye } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Tooltip from 'components/Tooltip';
import datasets from './datasets';

const DatasetDetail = (props) => {
  const { match } = props;
  const { id } = match.params;
  const { t, i18n } = useTranslation();

  const [data, setData] = useState({});

  useEffect(() => {
    Api.get(`register/${id}/`)
      .then((resp) => {
        resp.data.endpoints.sort((f) => (f.type === 'list' ? -1 : 1));
        setData(resp.data);
      });
  }, [id]);

  if (!Object.keys(data).length) {
    return null;
  }

  const genUrl = (endpoint) => `/system/datasets/${id}/${datasets[endpoint].urlEnding}`;

  // const actions = [];
  // if (data.list in datasets) {
  //   actions.push({
  //     label: t('registryData'),
  //     icon: Database,
  //     onClick: () => {
  //       history.push();
  //     },
  //   });
  // }

  return (
    <>
      <PageBox header={t('viewTheRegistry')}>
        <div className="flex flex-col lg:flex-row pt-5 px-5 sm:px-10 sm:pt-10 lg:pb-5 text-center sm:text-left">
          <div className="font-semibold text-3xl">
            {i18n.language === 'en' ? data.name_eng : data.name}
          </div>
        </div>
        <div className="px-3 sm:px-10 sm:pt-5 lg:pb-10">
          <table className="table table--sm">
            <tbody>
              <tr>
                <th className="whitespace-no-wrap">Api address:</th>
                <td><a className="text-theme-1 font-medium" href={data.api_address}>{data.api_address}</a></td>
              </tr>
              <tr>
                <th className="whitespace-no-wrap">Url address:</th>
                <td><a className="text-theme-1 font-medium" href={data.url_address}>{data.url_address}</a></td>
              </tr>
              <tr>
                <th className="whitespace-no-wrap">Source register id:</th>
                <td>{data.source_register_id}</td>
              </tr>
              <tr>
                <th className="whitespace-no-wrap">Source name:</th>
                <td>{data.source_name}</td>
              </tr>
              <tr>
                <th className="whitespace-no-wrap">Status:</th>
                <td>{data.status}</td>
              </tr>
              <tr>
                <th className="whitespace-no-wrap">Your token:</th>
                <td>
                  <Tooltip content={t('viewInProfile')}>
                    <Link className="text-theme-1 font-medium" to="/system/profile/">
                      {window.localStorage.getItem('token')}
                    </Link>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageBox>
      <h2 className="intro-y text-lg font-medium mr-auto mt-5">
        {t('endpoints')}
      </h2>
      <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table className="table table-report -mt-2">
          <thead>
            <tr>
              <th className="whitespace-no-wrap">{t('name')}</th>
              <th className="whitespace-no-wrap">{t('endpoint')}</th>
              <th className="text-center whitespace-no-wrap">{t('type')}</th>
              <th className="text-center whitespace-no-wrap">{t('totalRecords')}</th>
              <th className="text-center whitespace-no-wrap">{t('tools')}</th>
            </tr>
          </thead>
          <tbody>
            {data.endpoints.map((endpoint) => (
              <tr key={endpoint.endpoint} className="intro-x">
                <td>
                  {endpoint.name}
                </td>
                <td>
                  {endpoint.endpoint}
                </td>
                <td className="text-center">
                  {endpoint.type}
                </td>
                <td className="text-center">
                  {endpoint.total_records}
                </td>
                <td className="table-report__action w-56">
                  <div className="flex justify-center items-center">
                    {endpoint.type === 'list' && endpoint.endpoint in datasets ? (
                      <Link
                        to={genUrl(endpoint.endpoint)}
                        className="flex items-center mr-3 text-theme-1"
                      >
                        <Eye className="w-4 h-4 mr-1 mb-1" /> {t('view')}
                      </Link>
                    ) : '---'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

DatasetDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  // history: ReactRouterPropTypes.history.isRequired,
};

export default DatasetDetail;
