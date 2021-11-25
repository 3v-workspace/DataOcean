import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocaleField, isPep, renderDate } from 'utils';
import { useParams, useHistory } from 'react-router-dom';
import Api from 'api';
import { ArrowLeft } from 'react-feather';
import { ReactComponent as ImgPerson } from 'images/logo_person.svg';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import SanctionTableShadow from './SanctionTableShadow';
import PrintDownloadSanction from './PrintDownloadSanction';

const PersonSanctionDetail = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { t } = useTranslation();
  const history = useHistory();

  const fetchData = () => {
    Api.get(`sanction/person/${id}/`, { useProjectToken: true })
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
            <thead className="rounded-md">
              <tr className="bg-gray-200 text-gray-800 font-medium rounded-md">
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

  const getDetailInfo = () => {
    const infoFields = [
      { label: t('dateOfBirth'),
        value: data.date_of_birth ? data.date_of_birth : data.year_of_birth,
        render: (v) => renderDate(v),
      },
      { label: t('placeOfBirth'), value: data.place_of_birth },
      { label: t('address'), value: data.address },
      { label: t('countriesOfCitizenship'),
        value: data.countries_of_citizenship,
        render: (v) => v.map((country) => getLocaleField(country, 'name')).join(', '),
      },
      { label: t('fullNameOriginal'), value: data.full_name_original },
      { label: t('position'), value: data.occupation },
      { label: t('status'),
        value: data.is_pep,
        render: (v) => isPep(v),
      },
      { label: t('documentsInfo'), value: data.id_card },
      { label: t('taxpayerNumber'), value: data.taxpayer_number },
      { label: t('referenceData'), value: data.additional_info },
    ];
    return (
      <table className="lg:pl-5 mb-1 flex">
        <tbody>
          {infoFields.map((info, i) => (info.value ? (
            <tr key={i}>
              <td className="w-4/12 pr-1 font-medium align-top pb-1">{info.label}:</td>
              <td className="w-4/6 pb-1 align-bottom">{info.render ? info.render(info.value) : info.value}</td>
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
    <div className="mt-5 col-span-12 lg:col-span-6 box">
      <div className="py-2 border-b border-gray-200 text-blue-800 flex flex-row font-medium justify-between">
        <div className="inline-flex">
          <a onClick={() => history.goBack()} className="inline-flex pt-2 bg-opacity-0 text-blue-800 font-bold cursor-pointer">
            <ArrowLeft className="w-10 h-5" />
            {t('back')}
          </a>
        </div>
        <PrintDownloadSanction
          id={data.id}
          name={data.full_name_original ? data.full_name_original : data.full_name}
          dataset="sanction/person/"
        />
      </div>
      <div className="intro-y space-y-1 flex flex-row justify-around">
        <div className="py-4 px-5 self-auto content-around">
          <ImgPerson />
        </div>
        <div className="block flex flex-col md:w-3/5">
          <div className="py-4 lg:pl-5 max-w-screen-sm">
            <h2 className="text-3xl font-bold mr-auto capitalize">
              {data.full_name}
            </h2>
          </div>
          <div>
            {getDetailInfo()}
          </div>
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
        <div className="px-5 flex flex-row overflow-auto">
          {getSanctions(data.types_of_sanctions)}
        </div>
      </div>
      <PrintDownloadSanction
        className="pt-5 pb-10 mb-5"
        id={data.id}
        name={data.full_name_original ? data.full_name_original : data.full_name}
        dataset="sanction/person/"
      />
    </div>
  );
};

export default PersonSanctionDetail;
