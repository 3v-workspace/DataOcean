import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dateFormat, dateFormatEng } from 'utils';
import { useParams } from 'react-router-dom';
import Api from 'api';
import UnfoldingBlock from 'components/UnfoldingBlock';
import { Download } from 'react-feather';
import Tooltip from 'components/Tooltip';


const PersonSanctionDetail = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const fetchData = () => {
    Api.get(`sanction/person/${id}/`, { useProjectToken: true })
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
          {t('personInfo')}
        </h2>
        {/* TODO: Add 'Return to search results' button */}
        {/*{history.location.state?.fromProjects && (*/}
        {/*  <Button onClick={() => history.goBack()}
          className="bg-opacity-0 text-blue-800 h-2 mt-3">*/}
        {/*    <ArrowLeft className="w-10 h-5" />*/}
        {/*    <span className="underline">{t('returnToTheProject')}</span>*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
      <div className="col-span-12 lg:col-span-6">
        <div className="intro-y space-y-1 mt-8 box">
          <div className="py-4 pl-5 border-b border-gray-200 flex flex-row">
            <h2 className="text-2xl font-medium mr-auto capitalize">
              {data.full_name}
            </h2>
            <Tooltip
              position="bottom"
              arrow={false}
              content={t('inDevelopment')}
              className="flex mr-16 cursor-default text-blue-500 pt-3"
            >
              <Download className="w-5 h-5 mr-1 color-blue-500" />
              {t('export.downloadPdf')}
            </Tooltip>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">ID:</div>
            <div className="max-w-xl">{data.id}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('sanctionStartDate')}:</div>
            <div className="max-w-xl">{i18n.language === 'en' ? dateFormatEng(data.start_date) : dateFormat(data.start_date)}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('sanctionEndDate')}:</div>
            <div className="max-w-xl">{i18n.language === 'en' ? dateFormatEng(data.end_date) : dateFormat(data.end_date)}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('publicExpoused')}:</div>
            <div className="max-w-xl">{data.pep ? t('politicallyExposedPerson') : t('notPoliticallyExposedPerson')}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('dateOfBirth')}:</div>
            <div className="max-w-xl">{i18n.language === 'en' ? dateFormatEng(data.date_of_birth) : dateFormat(data.date_of_birth) || data.year_of_birth || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('placeOfBirth')}:</div>
            <div className="max-w-xl">{data.place_of_birth || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('address')}:</div>
            <div className="max-w-xl">{data.address || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('countriesOfCitizenship')}:</div>
            <div className="max-w-xl capitalize">
              {data.countries_of_citizenship.map((country) => country[`name_${i18n.language}`]).join(', ') || '---'}
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('position')}:</div>
            <div className="max-w-xl">{data.occupation || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('documentsInfo')}:</div>
            <div className="max-w-xl">{data.id_card || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('taxpayerNumber')}:</div>
            <div className="max-w-xl">{data.taxpayer_number || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('referenceData')}:</div>
            <div className="max-w-xl">{data.additional_info || '---'}</div>
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

export default PersonSanctionDetail;
