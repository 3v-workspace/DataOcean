import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'react-feather';
// import Alert from 'components/Alert';
// import { useParams } from 'react-router-dom';
import faqs from 'const/faqs';

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

  return (
    <>
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
            <a href="/system/contacts/" className="text-theme-1 block font-normal">{t('contactUs')}.</a>
          </div>
        </div>
      </div>
    </>
  );
};

// HelpPage.propTypes = {};

export default HelpPage;
