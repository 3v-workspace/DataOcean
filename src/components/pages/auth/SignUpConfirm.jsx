import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useHistory } from 'react-router-dom';
import Api from 'api';
import LoadingIcon from 'components/LoadingIcon';
import { useTranslation } from 'react-i18next';

const SignUpConfirm = ({ match }) => {
  const { t } = useTranslation();
  const { uid, token } = match.params;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  useEffect(() => {
    Api.post(`rest-auth/registration-confirm/${uid}/${token}/`)
      .then(() => {
        setSuccess(true);
      })
      .catch((e) => {
        if (e.response && e.response.data.detail) {
          setError(e.response.data.detail);
        } else {
          setError(e.message);
        }
      });
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push('/auth/sign-in/');
      }, 4000);
    }
  }, [success]);

  if (error) {
    return (
      <div>
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center text-theme-6 xl:text-left">
          {t('error')}
        </h2>
        <div className="intro-x mt-2 text-gray-500 text-center">
          {error}
        </div>
      </div>
    );
  }
  if (success) {
    return (
      <div>
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center text-theme-9 xl:text-left">
          {t('successfully')}!
        </h2>
        <div className="intro-x mt-2 text-gray-500 text-center">
          {t('inAFewSecondsYouWillRedirected')}.
        </div>
      </div>
    );
  }

  return (
    <div>
      <LoadingIcon icon="tail-spin" />
    </div>
  );
};

SignUpConfirm.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default SignUpConfirm;
