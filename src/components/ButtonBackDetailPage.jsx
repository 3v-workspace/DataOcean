import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';

const ButtonBackDetailPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="my-5">
      {location.key && (
        <button
          type="button"
          className="flex cursor-pointer font-bold text-l block-black mx-3 focus:outline-none"
          onClick={() => history.goBack()}
        >
          <ArrowLeft className="h-5 ml-2" />
          {location.state ? t('back') : t('backToSearchResults')}
        </button>
      )}
    </div>
  );
};


export default ButtonBackDetailPage;
