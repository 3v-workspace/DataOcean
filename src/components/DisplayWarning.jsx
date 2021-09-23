import React from 'react';
import whiteLogo from 'images/whitelogo.png';
import { useTranslation } from 'react-i18next';

const DisplayWarning = () => {
  const { t } = useTranslation();
  const landingUrl = process.env.REACT_APP_LANDING_URL;

  return (
    <div className="fixed flex flex-col top-0 left-0 justify-center w-full h-full">
      <div className="font-medium text-lg text-white text-center justify-center whitespace-pre-line p-8">
        {t('websiteAvailableOnDesktopDevices')}
      </div>
      <a href={landingUrl} className="intro-x flex justify-center self-center">
        <img alt="Data Ocean" src={whiteLogo} className="w-8 max-h-3 -mt-2" />
        <span className="text-white font-medium text-lg ml-3">Data Ocean</span>
      </a>
    </div>
  );
};

export default DisplayWarning;
