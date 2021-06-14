import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormatISO } from 'utils';
import { ArrowLeft, ChevronDown, ChevronUp } from 'react-feather';
import { Link } from 'react-router-dom';
import faqs from '../../help/faqs';
import { Button } from '../../../form-components';


const PepDetail = (props) => {
  const { t } = useTranslation();
  // const { history } = props;
  const defaultOpenState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  const [open, setOpen] = useState(defaultOpenState);
  const toggleOpen = (id) => {
    setOpen({
      ...defaultOpenState,
      [id]: !open[id],
    });
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {t('subscriptions')}
        </h2>
        {}
        {/*{history.location.state?.fromProjects && (*/}
        {/*  <Button onClick={() => history.goBack()}
          className="bg-opacity-0 text-blue-800 h-2 mt-3">*/}
        {/*    <ArrowLeft className="w-10 h-5" />*/}
        {/*    <span className="underline">{t('returnToTheProject')}</span>*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
      <div className="col-span-12 lg:col-span-6">
        <div className="intro-y mt-8 box">
          <div className="p-5 pt-0" id="basic-accordion">
            <div className="intro-y mb-4 border-b border-gray-200">
              <ul className="accordion font-medium block">
                {faqs.map((faq) => (
                  <li className="accordion__pane cursor-pointer pl-4 py-4 pr-20 block border-b border-gray-200 hover:text-theme-1" key={faq.id}>
                    <div className="accordion__pane__toggle inline-flex flex-row justify-between w-full" onClick={() => toggleOpen(faq.id)}>
                      {faq.question}
                      {open[faq.id] ? <ChevronUp className="w-4 h-6" /> : <ChevronDown className="w-4 h-6" />}
                    </div>
                    <div className="accordion__pane__content cursor-text mt-3 text-gray-700 font-normal">
                      {faq.answer}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pl-8 pb-8 font-normal">
            {t('faq.findQuestion')}
            <Link to="/system/contacts/" className="text-theme-1 block font-normal">{t('contactUs')}.</Link>
          </div>
        </div>
      </div>
    </>
  );
};
const HelpPage = () => {
  const { t } = useTranslation();
  const defaultOpenState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  const [open, setOpen] = useState(defaultOpenState);
  const toggleOpen = (id) => {
    setOpen({
      ...defaultOpenState,
      [id]: !open[id],
    });
  };
};


// CompanyDetail.propTypes = {};

export default PepDetail;
