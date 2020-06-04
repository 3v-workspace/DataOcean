import React, { useState } from 'react';
import Button from 'components/form-components/Button';
import TextInput from 'components/form-components/TextInput';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Form from 'components/form-components/Form';
import GoogleButton from 'components/pages/auth/GoogleButton';

const PasswordSecure = (props) => {
  const { level } = props;

  const getClassForLevel = (currLevel) => {
    let className = 'col-span-3 h-full rounded';
    if (level >= currLevel) {
      className += ' bg-theme-9';
    } else {
      className += ' bg-gray-200';
    }
    return className;
  };

  return (
    <div className="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3">
      <div className={getClassForLevel(1)} />
      <div className={getClassForLevel(2)} />
      <div className={getClassForLevel(3)} />
      <div className={getClassForLevel(4)} />
    </div>
  );
};
PasswordSecure.propTypes = {
  level: PropTypes.number.isRequired,
};

const SignUpForm = () => {
  const [psswdSec, setPsswdSec] = useState(0);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      accept_policy: false,
    },
    validate: (values) => {
      const errors = {};
      const { password } = values;
      if (password) {
        let level = -1;
        if (password.length >= 8) {
          level += 1;
        }
        if (/[A-Z]/.test(password)) {
          level += 1;
        }
        if (/[a-z]/.test(password)) {
          level += 1;
        }
        if (/[0-9]/.test(password)) {
          level += 1;
        }
        if (/[$@!%*#?&._/\\()[\]{}~=+-]/.test(password)) {
          level += 1;
        }
        if (level < 2) {
          errors.password = 'Пароль занадто простий';
        }
        setPsswdSec(level);
      } else {
        setPsswdSec(0);
      }
      if (!values.accept_policy) {
        errors.accept_policy = 'Для реєстрації ви повинні підтвердити згоду з політикою конфіденційності';
      }
      return errors;
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      password2: Yup.string().required().min(6),
      accept_policy: Yup.boolean(),
    }),
    onSubmit: () => {
      // TODO:
    },
  });

  return (
    <>
      <Form formik={formik} className="intro-x mt-8 xl:max-w-xs">
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Реєстрація
        </h2>
        <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
          A few more clicks to sign in to your account.
          Manage all your e-commerce accounts in one place
        </div>
        <div className="intro-x mt-8">
          <TextInput
            size="lg"
            name="first_name"
            className="intro-x login__input border-gray-300 block"
            placeholder="Ім'я"
            formik={formik}
          />
          <TextInput
            size="lg"
            name="last_name"
            className="intro-x login__input border-gray-300 block"
            placeholder="Прізвище"
            formik={formik}
          />
          <TextInput
            type="email"
            size="lg"
            name="email"
            className="intro-x login__input border-gray-300 block"
            placeholder="Email"
            formik={formik}
          />
          <TextInput
            type="password"
            size="lg"
            name="password"
            className="intro-x login__input border-gray-300 block"
            placeholder="Пароль"
            formik={formik}
          />
          <PasswordSecure level={psswdSec} />
          <a href="#?" className="intro-x text-gray-600 block mt-2 text-xs sm:text-sm">
            What is a secure password?
          </a>
          <TextInput
            type="password"
            name="password2"
            size="lg"
            className="intro-x login__input border-gray-300 block mt-4"
            placeholder="Підтвердження паролю"
            formik={formik}
          />
        </div>
        <div className="intro-x flex items-center text-gray-700 mt-4 text-xs sm:text-sm">
          <input
            type="checkbox"
            className="input border mr-2"
            id="accept_policy"
            name="accept_policy"
            checked={formik.values.accept_policy}
            onChange={formik.handleChange}
          />
          <label className="cursor-pointer select-none" htmlFor="accept_policy">
            I agree to the Envato
          </label>
          <a className="text-theme-1 ml-1" href="#?">Privacy Policy</a>.
        </div>
        {formik.touched.accept_policy && formik.errors.accept_policy && (
          <label className="error" htmlFor="accept_policy">{formik.errors.accept_policy}</label>
        )}
        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            className="text-white bg-theme-1 mr-3"
            size="lg"
            variant="primary"
          >
            Зареєструватись
          </Button>
          <Button
            className="xl:w-32 border-gray-300 mt-3 xl:mt-0"
            size="lg"
            variant="secondary"
            link="/auth/sign-in/"
          >
            Вхід
          </Button>
        </div>
        <GoogleButton>Продовжити з Google</GoogleButton>
      </Form>
    </>
  );
};

SignUpForm.propTypes = {};

export default SignUpForm;
