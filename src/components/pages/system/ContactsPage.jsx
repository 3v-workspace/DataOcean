import React from 'react';
import { useTranslation } from 'react-i18next';
//import Alert from 'components/Alert';

const ContactsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        {t('contacts')}
      </h2>
      <div className="intro-y mt-10">
        Наша електронна адреса:
      </div>
      <a href="mailto:info@dataocean.us">info@dataocean.us</a>
      <div className="intro-y mt-10">
        Слідкуйте за нашими новинами:
        <a href="https://www.linkedin.com/company/data-ocean/" target="_blank">
          <img src="/images/linkedin.png" alt="Linked in" />
        </a>
        <a href="https://www.facebook.com/DataOceanGroup/" target="_blank">
          <img src="/images/facebook.png" alt="Facebook" />
        </a>
      </div>
      <img src="https://dev.virtualearth.net/REST/v1/Imagery/Map/CanvasLight/Kyiv,%20UA?key=Atn679uHwJz5qBW7Qdydz8-WNiejypvCQM1WRC94l9MtNSsBeNwHcLXzUAfFPaBr&amp;mapSize=552,350" alt="Map of  Kyiv,   UA" />
    </>
  );
};

/* ContactsPage.propTypes = {};  */

export default ContactsPage;
