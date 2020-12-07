import React from 'react';
import { Translation } from 'react-i18next';

const faqs = [
  {
    id: 1,
    question: (
      <Translation>
        {(t) => `${t('faq.startWork')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              {t('faq.answer.q1AccessToken')}
              <mark className="p-1 bg-gray-200">
                94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
              </mark>
            </div>
            <div>
              {t('faq.answer.q1MainAnswer')}
            </div>
            <div>
              {t('faq.answer.q1FinalTitle')}
              <em className="block">
                Authorization: Token 94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
              </em>
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
        {(t) => `${t('faq.getApi')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              <div className="pr-12">
                {t('faq.answer.q2CorrectToken')}
              </div>
              <div>
                {t('faq.answer.q2TitleStructure')}
              </div>
              <div>
                <em className="block">
                  Authorization: Token {'<your_token>'}
                </em>
              </div>
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
        {(t) => `${t('faq.apiResults')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => (
          <>
            <div>
              <div>
                {t('faq.answer.q3Endpoints')}
              </div>
              <div>
                {t('faq.answer.q3Pagination')}
              </div>
              <div className="pl-10">
                page - {t('faq.answer.q3PageNumber')}
              </div>
              <div className="pl-10">
                page_size - {t('faq.answer.q3EntriesNumber')}
              </div>
              <div>
                {t('faq.answer.q3Default')} 10.
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
    id: 4,
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
                {t('faq.answer.q4FormatGetParameter')}
              </div>
              <div>
                {t('faq.answer.q4PossibleValues')} json, xml.
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
    id: 5,
    question: (
      <Translation>
        {(t) => `${t('faq.tariffPlans')}`}
      </Translation>
    ),
  },
  {
    id: 6,
    question: (
      <Translation>
        {(t) => `${t('faq.apiDocumentation')}`}
      </Translation>
    ),
    answer: (
      <Translation>
        {(t) => `${t('faq.answer.linkAPI')}`}
      </Translation>
    ),
  },
];

export default faqs;
