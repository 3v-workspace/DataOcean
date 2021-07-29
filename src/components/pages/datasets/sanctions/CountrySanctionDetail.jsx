import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils';
import { useParams } from 'react-router-dom';
import Api from 'api';
import UnfoldingBlock from 'components/UnfoldingBlock';


const CountrySanctionDetail = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const fetchData = () => {
    Api.get(`sanction/country/${id}/`, { useProjectToken: true })
      .then((resp) => {
        setData(resp.data);
      });
  };

  const getSanctions = (sanctions) => {
    if (!sanctions.length) {
      return '---';
    }
    return (
      <ul className="list-disc list-inside">
        {sanctions.map((sanction) => (
          <li>
            <span>
              {sanction}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!Object.keys(data).length) {
    return null;
  }

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg mr-auto">
          {t('countryInfo')}
        </h2>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <div className="intro-y space-y-1 mt-8 box">
          <div className="py-4 pl-5 border-b border-gray-200">
            <h2 className="text-2xl font-medium mr-auto capitalize">
              {data.country}
            </h2>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('sanctionStartDate')}:</div>
            <div className="max-w-xl">{dateFormat(data.start_date)}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('sanctionEndDate')}:</div>
            <div className="max-w-xl">{dateFormat(dateFormat(data.end_date), true)}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">ID:</div>
            <div className="max-w-xl">{data.id}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('reasoning')}:</div>
            <div className="max-w-xl">{data.reasoning || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('sanctionsDetail')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {getSanctions(data.types_of_sanctions)}
              </UnfoldingBlock>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountrySanctionDetail;
