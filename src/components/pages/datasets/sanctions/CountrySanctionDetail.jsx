import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils';
import { useParams, useHistory } from 'react-router-dom';
import Api from 'api';
import { ArrowLeft } from 'react-feather';
import { ReactComponent as CountryLogo } from 'images/logo_country.svg';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import LoadingIcon from 'components/LoadingIcon';
import SanctionTableShadow from './SanctionTableShadow';
import PrintDownloadSanction from './PrintDownloadSanction';

const CountrySanctionDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const history = useHistory();

  const fetchData = () => {
    Api.get(`sanction/country/${id}/`, { useProjectToken: true })
      .then((resp) => {
        setData(resp.data);
      });
  };

  const getSanctions = (sanctions) => {
    if (!sanctions.length) {
      return null;
    }
    return (
      <div className="intro-y col-span-12">
        <SanctionTableShadow>
          <table className="table">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-medium">
                <th>{t('typeOfSanction')}</th>
                <th>{t('startDate')}</th>
                <th>{t('endDate')}</th>
                <th>{t('reasoningDate')}</th>
                <th>{t('cancelingConditions')}</th>
              </tr>
            </thead>
            <tbody>
              {sanctions.map((sanction) => (
                <tr
                  key={sanction}
                  className="text-gray-700 border-b border-gray-200"
                >
                  <td>{sanction}</td>
                  <td>{renderDate(data.start_date)}</td>
                  <td>{renderDate(data.end_date)}</td>
                  <td>{renderDate(data.reasoning_date)}</td>
                  <td>{data.cancellation_condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SanctionTableShadow>
      </div>
    );
  };

  useTopBarHiddingEffect();

  useEffect(() => {
    fetchData();
  }, []);

  if (!Object.keys(data).length) {
    return null;
  }

  return (
    <div className="mt-5 col-span-12 lg:col-span-6 box">
      {loading && (
        <div
          className="w-full h-full bg-gray-900 bg-opacity-50 absolute flex flex-col items-center justify-center z-50 -mb-10"
        >
          <LoadingIcon icon="wave" />
          <div className="text-2xl text-white font-medium text-center pt-2">
            {t('PDFDownload')}
          </div>
        </div>
      )}
      <div className="py-2 border-b border-gray-200 text-blue-800 flex flex-row font-medium justify-between">
        <div className="inline-flex">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="inline-flex pt-2 bg-opacity-0 text-blue-800 font-bold cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-10 h-5" />
            {t('back')}
          </button>
        </div>
        <PrintDownloadSanction id={data.id} name={data.country} dataset="sanction/country/" setLoading={setLoading} />
      </div>
      <div className="intro-y space-y-1 mb-5">
        <div className="py-4 pl-5 flex justify-between">
          <div className="flex justify-start">
            <CountryLogo />
            <h2 className="pl-5 text-2xl font-medium capitalize self-center">
              {data.country}
            </h2>
          </div>
          <div className="pr-5 text-gray-500 text-right">
            <div>ID: {data.id}</div>
            <div>{`${t('updatedAt')}: `}{renderDate(data.updated_at)}</div>
          </div>
        </div>
        {data.decree && (
          <div className="intro-y pl-5 mt-8 font-bold text-xl">
            {`${t('sanctionsUnderThePresidentialDecree', { numberDecree: data.decree })} `}{renderDate(data.start_date)}
          </div>
        )}
        <div className="px-5 pt-2 flex flex-row overflow-auto">
          {getSanctions(data.types_of_sanctions)}
        </div>
        <PrintDownloadSanction className="pt-5 pb-10" id={data.id} name={data.country} dataset="sanction/country/" setLoading={setLoading} />
      </div>
    </div>
  );
};

export default CountrySanctionDetail;
