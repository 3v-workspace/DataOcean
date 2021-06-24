import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dateFormatISO } from 'utils';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useParams } from 'react-router-dom';
import Api from 'api';


const PepDetail = () => {
  const { idp } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isDataReady, setDataReady] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const fetchData = () => {
    setLoading(true);
    Api.get(`pep/${idp}/`)
      .then((resp) => {
        setData(resp.data);
        setDataReady(true);
      })
      .catch((err) => {
        if (err.response?.data?.detail) {
          setError(err.response.data.detail);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);
  const fromPersonLinksLength = data.from_person_links ? data.from_person_links.length : 0;
  const toPersonLinksLength = data.to_person_links ? data.to_person_links.length : 0;
  // const { history } = props;
  const [openRelatedPersons, setOpenRelatedPersons] = useState(false);
  const toggleOpenRelatedPersons = () => {
    setOpenRelatedPersons(!openRelatedPersons);
  };
  const [openRelatedCompanies, setOpenRelatedCompanies] = useState(false);
  const toggleOpenRelatedCompanies = () => {
    setOpenRelatedCompanies(!openRelatedCompanies);
  };
  const [openCriminalProceedings, setOpenCriminalProceedings] = useState(false);
  const toggleOpenCriminalProceedings = () => {
    setOpenCriminalProceedings(!openCriminalProceedings);
  };
  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg mr-auto">
          {t('pepDetail.pepInfo')}
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
              {i18n.language === 'uk' ? data.fullname : data.fullname_en}
            </h2>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">ID:</div>
            <div className="max-w-xl">{data.id}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.updatedAt')}:</div>
            <div className="max-w-xl">{dateFormatISO(data.updated_at)}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('status')}:</div>
            <div className="max-w-xl">{data.is_pep ? t('politicallyExposedPerson') : t('notPoliticallyExposedPerson')}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.pepType')}:</div>
            <div className="max-w-xl">{data.pep_type_display}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.terminationDate')}:</div>
            <div className="max-w-xl">{data.termination_date ? dateFormatISO(data.termination_date) : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.reasonOfTermination')}:</div>
            <div className="max-w-xl">{data.reason_of_termination ? data.reason_of_termination : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('dateOfBirth')}:</div>
            <div className="max-w-xl">{data.date_of_birth ? data.date_of_birth : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.placeOfBirth')}:</div>
            <div className="max-w-xl">{
              (() => {
                if (data.place_of_birth) {
                  return i18n.language === 'uk' ? data.place_of_birth : data.place_of_birth_en;
                }
                return '---';
              })()
            }
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.isDead')}:</div>
            <div className="max-w-xl">{data.is_dead ? t('yes') : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.lastJobTitle')}:</div>
            <div className="max-w-xl">{
              (() => {
                if (data.last_job_title) {
                  return i18n.language === 'uk' ? data.last_job_title : data.last_job_title_en;
                }
                return '---';
              })()
            }
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.lastEmployer')}:</div>
            <div className="max-w-xl">{
              (() => {
                if (data.last_employer) {
                  return i18n.language === 'uk' ? data.last_employer : data.last_employer_en;
                }
                return '---';
              })()
            }
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.assetsInfo')}:</div>
            <div className="max-w-xl">{data.assets_info ? data.assets_info : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.relatedPersons')}:</div>
            <div className="max-w-xl">
              <ul className={`overflow-y-hidden list-disc list-inside ${openRelatedPersons ? '' : 'max-h-3'}`}>
                {fromPersonLinksLength ? data.from_person_links.map((person) => (
                  <li>
                    <span className="italic">{i18n.language === 'uk' ? person.to_person_relationship_type : person.to_person_relationship_type_en} — </span>
                    <span className="capitalize underline">{i18n.language === 'uk' ? person.to_person.fullname : person.to_person.fullname_en}</span>
                  </li>
                )) : null}
                {toPersonLinksLength ? data.to_person_links.map((person) => (
                  <li>
                    <span className="italic">{i18n.language === 'uk' ? person.from_person_relationship_type : person.from_person_relationship_type_en} — </span>
                    <span className="capitalize underline">{i18n.language === 'uk' ? person.from_person.fullname : person.from_person.fullname_en}</span>
                  </li>
                )) : null}
              </ul>
              {fromPersonLinksLength + toPersonLinksLength > 3 ? (
                <div className="flex flex-row cursor-pointer text-blue-800" onClick={() => toggleOpenRelatedPersons()}>
                  {openRelatedPersons ? [<ChevronUp className="w-4 h-6" />, t('viewLess')] : [<ChevronDown className="w-4 h-6" />, t('viewMore')]}
                </div>
              ) : null}
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.relatedCompanies')}:</div>
            <div className="max-w-xl">
              <ul className={`overflow-y-hidden list-disc list-inside ${openRelatedCompanies ? '' : 'max-h-3'}`}>
                {data.related_companies && data.related_companies.length > 0 ?
                  data.related_companies.map((company) => (
                    <li>
                      <span className="underline">
                        {i18n.language === 'uk' ? company.company.name : company.company.name_en} ({company.company.edrpou})
                      </span>
                    </li>
                  )) : '---'}
              </ul>
              {data.related_companies && data.related_companies.length > 3 ? (
                <div className="flex flex-row cursor-pointer text-blue-800" onClick={() => toggleOpenRelatedCompanies()}>
                  {openRelatedCompanies ? [<ChevronUp className="w-4 h-6" />, t('viewLess')] : [<ChevronDown className="w-4 h-6" />, t('viewMore')]}
                </div>
              ) : null}
            </div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.sanctions')}:</div>
            <div className="max-w-xl">{data.sanctions ? data.sanctions : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.criminalRecords')}:</div>
            <div className="max-w-xl">{data.criminal_record ? data.criminal_record : '---'}</div>
          </div>
          <div className="pl-5 flex flex-row">
            <div className="w-64 font-medium">{t('pepDetail.criminalProceedings')}:</div>
            <div className="max-w-xl">{
              (() => {
                if (data.criminal_proceedings) {
                  const proceedings = data.criminal_proceedings.replace(/(\\r\\n)+/g, '</br>').replace(/(\\")+/g, '"');
                  return openCriminalProceedings ?
                    <div dangerouslySetInnerHTML={{ __html: proceedings }} /> :
                    <div dangerouslySetInnerHTML={{ __html: proceedings.substr(0, 777) }} />;
                }
                return '---';
              })()
            }
              {data.criminal_proceedings && data.criminal_proceedings.length > 777 ? (
                <div className="flex flex-row cursor-pointer text-blue-800" onClick={() => toggleOpenCriminalProceedings()}>
                  {openCriminalProceedings ? [<ChevronUp className="w-4 h-6" />, t('viewLess')] : [<ChevronDown className="w-4 h-6" />, t('viewMore')]}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// PepDetail.propTypes = {};

export default PepDetail;
