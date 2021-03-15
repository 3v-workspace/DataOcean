import React from 'react';
import { Translation } from 'react-i18next';
import { baseApiUrl } from 'api';
import { Link } from 'react-router-dom';
import i18n from 'i18next';

const faqs = [
  {
    id: 1,
    question: (
      <Translation>
        {(t) => `${t('faq.whatDataDOProvide')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {`${t('faq.answer.q1DOWorksWithPublicData')} `}
              <Link to="/system/datasets/" className="text-theme-1 font-normal">
                {t('theListOfDatasets')}
              </Link>
              {` ${t('faq.answer.q1constantlyUpgrated')}`}
            </div>
            <div>
              {t('faq.answer.q1GuaranteeCompliance')}
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 2,
    question: (
      <Translation>
        {(t) => `${t('faq.accessPEPDatabase')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {`${t('faq.answer.q2')} `}
              <Link to="/system/subscriptions/" className="text-theme-1 font-normal">
                {`${t('faq.answer.tariffs')}.`}
              </Link>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 3,
    question: (
      <Translation>
        {(t) => `${t('faq.PEPRegisterTrustworthyOrLegallyValid')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q3InfoContainedInTheRegister')}
              <a href={`https://pep.org.ua/${i18n.language}/article/6`} className="text-theme-1 font-normal" target="_blank">
                {` ${t('faq.answer.sources')}.`}
              </a>
            </div>
            <div>
              {t('faq.answer.q3TheUsageOfTheRegisterRecommended')}
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 4,
    question: (
      <Translation>
        {(t) => (
          <>
            <div>
              {i18n.language === 'en' ? 'Are ' : ''}
              <a className="text-theme-1" href={`https://pep.org.ua/${i18n.language}/`} target="_blank">Pep.org.ua</a>
              {` ${t('and')} `}
              <a className="text-theme-1" href={`${process.env.REACT_APP_LANDING_URL}pep/?lang=${i18n.language}`} target="_blank">Data Ocean</a>
              {` ${t('faq.differentRegisters')}`}
            </div>
          </>
        )}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q4DOIsATechnicalPartner')}
            </div>
            <div>
              {t('faq.answer.q4ProceedsFromTheSale')}
            </div>
            <div>
              {`${t('faq.answer.q4InAdditionToPEPRegistry')} `}
              <Link to="/system/datasets/" className="text-theme-1">
                {`${t('datasets').toLowerCase()}.`}
              </Link>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 5,
    question: (
      <Translation>
        {(t) => `${t('faq.whatIsAnAPIRequest')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q5AnAPIRequestIs')}
            </div>
            <div>
              {t('faq.answer.q5AccessThroughAPI')}
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 6,
    question: (
      <Translation>
        {(t) => `${t('faq.downloadEntirePEPDatabase')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q6')}
              <Link to="/system/subscriptions/" className="text-theme-1">
                {` Basic+ ${t('tariff')}.`}
              </Link>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 7,
    question: (
      <Translation>
        {(t) => `${t('faq.startWorking')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q7OnTheTab')}
              <Link to="/system/api/" className="text-theme-1">
                {' API '}
              </Link>
              {`${t('and')} ${t('faq.answer.q7InTheUserProfile')}`}
              <Link to="/system/profile/projects/" className="text-theme-1">
                {` "${t('projects')}". `}
              </Link>
              {t('faq.answer.q7AccessToken')}
              <mark className="p-1 bg-gray-200">
                94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
              </mark>
            </div>
            <div>
              {t('faq.answer.q7MainAnswer')}
            </div>
            <div>
              {t('faq.answer.q7FinalTitle')}
              <em className="block">
                Authorization: DataOcean 94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
              </em>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 8,
    question: (
      <Translation>
        {(t) => `${t('faq.upToDateListOfPEPOnASpecificDate')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q8')}
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 9,
    question: (
      <Translation>
        {(t) => `${t('faq.howManyAPIRequestsINeedToUsePEPDatabase')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q9')}
              <a className="text-theme-1" href={`${process.env.REACT_APP_LANDING_URL}pep/?lang=${i18n.language}`} target="_blank"> dataocean.us </a>
              {t('faq.answer.q9AndOn')}
              <a className="text-theme-1" href={`https://pep.org.ua/${i18n.language}/`} target="_blank"> pep.org.ua.</a>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 10,
    question: (
      <Translation>
        {(t) => `${t('faq.getApi')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              <div className="pr-12">
                {`${t('faq.answer.q10CorrectToken')}${t('faq.answer.q7OnTheTab').toLowerCase()}`}
                <Link to="/system/api/" className="text-theme-1">
                  {' API '}
                </Link>
                {`${t('and')} ${t('faq.answer.q7InTheUserProfile')}`}
                <Link to="/system/profile/projects/" className="text-theme-1">
                  {` "${t('projects')}". `}
                </Link>
              </div>
              <div>
                {t('faq.answer.q10TitleStructure')}
              </div>
              <div>
                <em className="block">
                  Authorization: DataOcean {'<your_token>'}
                </em>
              </div>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 11,
    question: (
      <Translation>
        {(t) => `${t('faq.apiResults')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              <div>
                {t('faq.answer.q11Endpoints')}
              </div>
              <div>
                {t('faq.answer.q11Pagination')}
              </div>
              <div className="pl-10">
                page - {t('faq.answer.q11PageNumber')}
              </div>
              <div className="pl-10">
                page_size - {t('faq.answer.q11EntriesNumber')}
              </div>
              <div>
                {t('faq.answer.q11Default')} 10.
              </div>
              <div>
                {t('faq.answer.maxValue')} 100.
              </div>
              <div>
                <em className="block mt-1">
                  {t('faq.answer.example')} /api/company/?page=3&page_size=25
                </em>
              </div>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 12,
    question: (
      <Translation>
        {(t) => `${t('faq.xmlFormat')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              <div>
                {t('faq.answer.q12FormatGetParameter')}
              </div>
              <div>
                {t('faq.answer.q12PossibleValues')} json, xml.
              </div>
              <div>
                <em className="block mt-1">
                  {t('faq.answer.example')} /api/company/?format=xml
                </em>
              </div>
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 13,
    question: (
      <Translation>
        {(t) => `${t('faq.howToPayYourTariff')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q13SelectingPaidTariff')}
              <Link to="/system/profile/projects/" className="text-theme-1">
                {` "${t('projects')}".`}
              </Link>
            </div>
            <div>
              {t('faq.answer.q13')}
            </div>
          </>
        )}
      </Translation>
    ),
  },
  {
    id: 14,
    question: (
      <Translation>
        {(t) => `${t('faq.apiDocumentation')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {`${t('faq.answer.docAPI')} `}
              <a className="text-theme-1" href={`${baseApiUrl}/schema/redoc/`}>{`${t('byLink')}`}</a>
            </div>
          </>
        )}
      </Translation>
    ),
  },
];

export default faqs;
