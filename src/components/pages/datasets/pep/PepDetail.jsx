import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils';
import { useParams } from 'react-router-dom';
import Api from 'api';
import UnfoldingBlock from 'components/UnfoldingBlock';


const PepDetail = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const fetchData = () => {
    Api.get(`pep/${id}/`, { useProjectToken: true })
      .then((resp) => {
        setData(resp.data);
      });
  };

  const getLocaleField = (object, fieldName) => {
    if (i18n.language === 'uk') {
      return object[fieldName] || '---';
    }
    return object[`${fieldName}_en`] || '---';
  };

  const prepareHtmlField = (rawValue) => {
    if (rawValue) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: rawValue.replace(/(\\r\\n)+/g, '</br>').replace(/(\\")+/g, '"'),
          }}
        />
      );
    }
    return '---';
  };

  const getRelatedCompanies = (relatedCompanies) => {
    if (!relatedCompanies.length) {
      return '---';
    }
    return (
      <ul className="list-disc list-inside">
        {relatedCompanies.map((company) => (
          <li>
            <span>
              {getLocaleField(company.company, 'name')} ({company.company.edrpou})
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const getRelatedPersons = (relatedFromPersons, relatedToPersons) => {
    if (!relatedFromPersons.length && !relatedToPersons.length) {
      return '---';
    }
    return (
      <ul className="list-disc list-inside">
        {relatedFromPersons.map((person) => (
          <li>
            <span className="italic mr-1">
              {getLocaleField(person, 'to_person_relationship_type')} —
            </span>
            <span className="capitalize">
              {getLocaleField(person.to_person, 'fullname')}
            </span>
          </li>
        ))}
        {relatedToPersons.map((person) => (
          <li>
            <span className="italic mr-1">
              {getLocaleField(person, 'from_person_relationship_type')} —
            </span>
            <span className="capitalize">
              {getLocaleField(person.from_person, 'fullname')}
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
          {t('pepInfo')}
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
          <div className="py-4 pl-5 border-b border-gray-200">
            <h2 className="text-2xl font-medium mr-auto capitalize">
              {getLocaleField(data, 'fullname')}
            </h2>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">ID:</div>
            <div className="max-w-xl">{data.id}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('updatedAt')}:</div>
            <div className="max-w-xl">{dateFormat(data.updated_at)}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('status')}:</div>
            <div className="max-w-xl">{data.is_pep ? t('politicallyExposedPerson') : t('notPoliticallyExposedPerson')}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetailType')}:</div>
            <div className="max-w-xl">{data.pep_type_display}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('terminationDatePep')}:</div>
            <div className="max-w-xl">{data.termination_date ? dateFormat(data.termination_date) : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('reasonOfTermination')}:</div>
            <div className="max-w-xl">{data.reason_of_termination || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('dateOfBirth')}:</div>
            <div className="max-w-xl">{dateFormat(data.date_of_birth) || '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('placeOfBirth')}:</div>
            <div className="max-w-xl">{getLocaleField(data, 'place_of_birth')}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('isDead')}:</div>
            <div className="max-w-xl">{data.is_dead ? t('yes') : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('lastPosition')}:</div>
            <div className="max-w-xl">{getLocaleField(data, 'last_job_title')}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('lastPlaceOfWork')}:</div>
            <div className="max-w-xl">{getLocaleField(data, 'last_employer')}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('assetsInfo')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {prepareHtmlField(data.assets_info)}
              </UnfoldingBlock>
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('relatedPersons')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {getRelatedPersons(data.from_person_links, data.to_person_links)}
              </UnfoldingBlock>
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('relatedCompanies')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {getRelatedCompanies(data.related_companies)}
              </UnfoldingBlock>
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('sanctions')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {prepareHtmlField(data.sanctions)}
              </UnfoldingBlock>
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('criminalRecords')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {prepareHtmlField(data.criminal_records)}
              </UnfoldingBlock>
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('criminalProceedings')}:</div>
            <div className="max-w-xl">
              <UnfoldingBlock>
                {prepareHtmlField(data.criminal_proceedings)}
              </UnfoldingBlock>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PepDetail;
