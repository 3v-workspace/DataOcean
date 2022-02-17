import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocaleField, renderDate } from 'utils';
import { useParams, useHistory, Link } from 'react-router-dom';
import Api from 'api';
import { ArrowLeft } from 'react-feather';
import { ReactComponent as EmptyLogo } from 'images/logo_company.svg';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import { renderCondition } from 'utils/conditions';
import LoadingIcon from 'components/LoadingIcon';
import SanctionTableShadow from './SanctionTableShadow';
import PrintDownloadSanction from './PrintDownloadSanction';

const CompanySanctionDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const history = useHistory();
  const fetchData = () => {
    Api.get(`sanction/company/${id}/`, { useProjectToken: true })
      .then((resp) => {
        setData(resp.data);
      });
  };

  const getSanctions = (sanctions) => {
    if (!sanctions.length) {
      return null;
    }
    return (
      <div className="intro-y mt-6 col-span-12">
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
                  <td>{renderCondition(data)}</td>
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

  const getDetailInfo = () => {
    const infoFields = [
      { label: t('taxpayerNumber'), value: data.taxpayer_number },
      { label: t('address'), value: data.address },
      { label: t('countryOfRegistration'),
        value: data.country_of_registration,
        render: (v) => getLocaleField(v, 'name'),
      },
      { label: t('nameOriginal'), value: data.name_original },
      { label: t('registrationNumber'), value: data.registration_number },
      { label: t('registrationDate'),
        value: data.registration_date,
        render: (v) => renderDate(v),
      },
      { label: t('reasoning'), value: data.reasoning },
      { label: t('referenceData'), value: data.additional_info },
    ];
    return (
      <table className="lg:pl-5 mb-1 flex">
        <tbody>
          {infoFields.map((info, i) => (info.value ? (
            <tr key={i}>
              <td className="w-4/12 pr-1 font-medium align-top pb-1">{info.label}:</td>
              <td className="w-4/6 align-bottom pb-1">{info.render ? info.render(info.value) : info.value}</td>
            </tr>
          ) : null))}
        </tbody>
      </table>
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
    <>
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
          <PrintDownloadSanction id={data.id} name={data.name_original} setLoading={setLoading} dataset="sanction/company/" />
        </div>
        <div className="intro-y space-y-1 flex flex-row justify-around">
          <div className="py-4 px-5 self-auto content-around justify-start">
            <EmptyLogo />
          </div>
          <div className="block flex flex-col md:w-3/5">
            <div className="py-4 lg:pl-5 max-w-screen-sm">
              <h2 className="text-2xl font-medium mr-auto capitalize">
                {data.name}
              </h2>
            </div>
            {getDetailInfo()}
          </div>
          <div className="py-4 text-gray-500 text-right mr-4">
            <div>ID: {data.id}</div>
            <div>{`${t('updatedAt')}: `}{renderDate(data.updated_at)}</div>
          </div>
        </div>
        <div>
          {data.decree && (
            <div className="intro-y pl-5 mt-8 font-bold text-lg">
              {`${t('sanctionsUnderThePresidentialDecree', { numberDecree: data.decree })} `}{renderDate(data.start_date)}
            </div>
          )}
          <div className="px-5 flex flex-row w-full overflow-auto">
            {getSanctions(data.types_of_sanctions)}
          </div>
        </div>
        <PrintDownloadSanction className="pt-5 pb-10 mb-5" id={data.id} name={data.name_original} setLoading={setLoading} dataset="sanction/company/" />
      </div>
    </>
  );
};

export default CompanySanctionDetail;
