import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/form-components';
import { Facebook, Linkedin, Mail } from 'react-feather';
//import Alert from 'components/Alert';

const ContactsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="intro-y text-lg font-medium justify-between mt-5 mb-5">
        {t('contacts')}
      </h2>
      <div className="intro-y box inline-grid grid-cols-2">
        <div className="inline-grid">
          <div className="mx-10 pt-10">
            <span className="font-medium mx-10">{t('contactWrite')}:</span>
            <a className="items-center flex justify-center mt-5" href="mailto:info@dataocean.us"><Mail className="w-4 h-4 mr-2" />info@dataocean.us</a>
          </div>
          <div className="mx-10 pt-5 border-t border-gray-200">
            <span className="mx-10 my-20 pt-10 font-medium">{t('followOurNews')}:</span>
            <div className="flex items-center justify-center mt-5">
              <Button className="w-32 mr-2 mb-2 bg-theme-35 cursor-pointer" href="https://www.linkedin.com/company/data-ocean/" target="_blank"><Linkedin className="w-4 h-4 mr-2" />Linkedin</Button>
              <Button className="w-32 mr-2 mb-2 bg-theme-32 cursor-pointer" href="https://www.facebook.com/DataOceanGroup/" target="_blank"><Facebook className="w-4 h-4 mr-2" />Facebook</Button>
            </div>
          </div>
        </div>
        <div className="inline-grid">
          <div className="m-2 flex items-center justify-center">
            <img alt="Map of Kyiv, UA" src="/images/map.png" />
          </div>
        </div>
      </div>
    </>
  );
};

/* ContactsPage.propTypes = {};  */

export default ContactsPage;
