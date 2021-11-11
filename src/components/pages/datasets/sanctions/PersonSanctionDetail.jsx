import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocaleField, isPep, renderDate } from 'utils';
import { useParams, useHistory } from 'react-router-dom';
import Api from 'api';
import { Download, Printer, ArrowLeft } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { ReactComponent as ImgPerson } from 'images/logo_person.svg';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';

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
        <div className="overflow-auto md:overflow-hidden">
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
        </div>
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
    return infoFields.map((info, i) => (info.value ? (
      <div className="pl-5 mb-1 flex" key={i}>
        <div className="w-4/12 pr-1 font-medium">{info.label}:</div>
        <div className="w-4/6 self-end ">{info.render ? info.render(info.value) : info.value}</div>
      </div>
    ) : null));
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
      <div className="py-2 pr-5 border-b border-gray-200 text-blue-800 flex flex-row font-medium justify-between">
        <div className="inline-flex">
          <a onClick={() => history.goBack()} className="inline-flex pt-2 bg-opacity-0 text-blue-800 font-bold cursor-pointer">
            <ArrowLeft className="w-10 h-5" />
            {t('back')}
          </a>
        </div>
        <Tooltip
          position="bottom"
          arrow={false}
          content={t('inDevelopment')}
          className="cursor-default"
        >
          <div className="inline-flex mr-8 pt-2">
            <Printer className="w-5 h-5 mr-1" />
            {t('print')}
          </div>
          <div className="inline-flex">
            <Download className="w-5 h-5 mr-1" />
            {t('export.downloadPdf')}
          </div>
        </Tooltip>
      </div>
      <div className="intro-y space-y-1 flex flex-row justify-around">
        <div className="py-4 px-5 self-auto content-around">
          <ImgPerson />
        </div>
        <div className="block flex flex-col md:w-3/5">
          <div className="py-4 pl-5 max-w-screen-sm">
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
      <div className="pt-5 pb-10 pr-5 text-blue-800 flex flex-row justify-end font-medium">
        <Tooltip
          position="bottom"
          arrow={false}
          content={t('inDevelopment')}
          className="cursor-default"
        >
          <div className="inline-flex mr-8">
            <Printer className="w-5 h-5 mr-1" />
            {t('print')}
          </div>
          <div className="inline-flex">
            <Download className="w-5 h-5 mr-1" />
            {t('export.downloadPdf')}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default PersonSanctionDetail;
