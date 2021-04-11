import React from 'react';
import TextInput from 'components/form-components/TextInput';
import BooleanInput from 'components/form-components/BooleanInput';
import Button from 'components/form-components/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Form from 'components/form-components/Form';
import { useDispatch } from 'react-redux';
import { userLogin } from 'store/user/actionCreators';
import { useTranslation } from 'react-i18next';
import GoogleButton from 'components/pages/auth/GoogleButton';
import Api from 'api';
import setLanguage from 'utils/setLanguage';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useDOCookies } from 'hooks';


const SignInForm = ({ history }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const setCookie = useDOCookies()[1];


  let policy = '/docs/PrivacyPolicyUk.html';
  if (i18n.language === 'en') {
    policy = '/docs/PrivacyPolicyEn.html';
  }

  let terms = '/docs/TermsAndConditionsUk.html';
  if (i18n.language === 'en') {
    terms = '/docs/TermsAndConditionsEn.html';
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember_me: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
      remember_me: Yup.bool(),
    }),
    onSubmit: (values, actions) => {
      Api.post('rest-auth/login/', values)
        .then((resp) => {
          actions.setSubmitting(false);
          const { user, key, project_token } = resp.data;
          setCookie('token', key);
          setCookie('firstname', user.first_name);
          setCookie('lastname', user.last_name);
          setCookie('email', user.email);
          window.localStorage.setItem('project_token', project_token);
          dispatch(userLogin(user));
          setLanguage(user.language);
          const subId = +window.localStorage.getItem('subscription');
          if (subId) {
            history.push('/system/subscriptions/');
          }
        })
        .catch(({ response }) => {
          if (response && response.data && response.data.non_field_errors) {
            actions.setFieldError('password', t('invalidLoginOrPassword'));
          }
          actions.setSubmitting(false);
        });
      // actions.setFieldError('password', 'Невірний логін або пароль');
    },
  });

  return (
    <Form formik={formik}>
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        {t('signIn')}
      </h2>
      <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
        {t('fewMoreSteps')}
      </div>
      <div className="intro-x mt-8">
        <TextInput
          type="email"
          name="email"
          className="intro-x login__input border-gray-300 block"
          size="lg"
          placeholder="Email"
          formik={formik}
        />
        <TextInput
          type="password"
          name="password"
          autoComplete="on"
          className="intro-x login__input border-gray-300 block mt-4"
          size="lg"
          placeholder={t('password')}
          formik={formik}
        />
      </div>
      <div className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
        <BooleanInput
          className="mr-auto"
          name="remember_me"
          label={t('rememberMe')}
          formik={formik}
        />
        <Link to="/auth/restore-pass/" className="text-theme-1">{t('forgotPassword')}</Link>
      </div>
      <div className="intro-x xl:flex mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          isLoading={formik.isSubmitting}
          className="flex-1 xl:w-2/5 xl:mr-3"
          width="w-full"
        >
          {t('logIn')}
        </Button>
        <Button
          className="flex-1 xl:w-2/5 mt-3 xl:mt-0"
          // variant="secondary"
          width="w-full"
          link="/auth/sign-up/"
        >
          {t('registration')}
        </Button>
      </div>
      <GoogleButton>{t('continueWith')} Google</GoogleButton>
      <div className="intro-x mt-10 xl:mt-18 text-gray-700 text-center xl:text-left">
        {t('bySigningUpYouAgreeWith')}
        <br />
        <a
          className="text-theme-1"
          href={`${process.env.PUBLIC_URL}${terms}`}
          target="_blank"
        >
          {t('termsAndConditions')}
        </a>
        {' & '}

        <a className="text-theme-1" href={`${process.env.PUBLIC_URL}${policy}`} target="_blank">
          {t('privacyPolicy')}
          {/* {i18n.language === 'en' ? 'Українська' : 'English'} */}
        </a>.
      </div>
    </Form>
  );
};

SignInForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default SignInForm;
