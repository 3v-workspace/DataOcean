import React, { useState } from 'react';
import Button from 'components/form-components/Button';
import TextInput from 'components/form-components/TextInput';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Yup, { getPasswordLevel } from 'utils/yup';
import Form from 'components/form-components/Form';
import GoogleButton from 'components/pages/auth/GoogleButton';
import Api from 'api';
import Tooltip from 'components/Tooltip';

const PasswordSecure = (props) => {
  const { level } = props;

  const getClassForLevel = (currLevel) => {
    let className = 'col-span-3 h-full rounded';
    if (level >= currLevel) {
      if (level < 2) {
        className += ' bg-theme-12';
      } else if (level >= 2) {
        className += ' bg-theme-9';
      }
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
  const [sent, setSent] = useState(false);
  // const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
      accept_policy: false,
    },
    validate: (values) => {
      const errors = {};
      const { password1, password2 } = values;
      if (password1) {
        const level = getPasswordLevel(password1);
        if (level < 2) {
          errors.password1 = 'Пароль занадто простий';
        }
        setPsswdSec(level);
      } else {
        setPsswdSec(0);
      }
      if (password1 !== password2) {
        errors.password2 = 'Паролі не співпадають';
      }
      if (!values.accept_policy) {
        errors.accept_policy = 'Для реєстрації ви повинні підтвердити ' +
          'згоду з політикою конфіденційності';
      }
      return errors;
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      email: Yup.string().required().email(),
      password1: Yup.string().required().min(6),
      password2: Yup.string().required().min(6),
      accept_policy: Yup.boolean(),
    }),
    onSubmit: (values, actions) => {
      Api.post('rest-auth/registration/', values)
        .then(() => {
          setSent(true);
        })
        .catch(({ response }) => {
          if (response && response.data) {
            Object.entries(response.data).forEach(([field, errors]) => {
              actions.setFieldError(field, errors[0]);
            });
          }
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  if (sent) {
    return (
      <div>
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Перевірьте пошту
        </h2>
        <div className="intro-x mt-2 text-gray-500 text-center">
          На ваш email було надіслано повідомлення з інструкціями для підтвердження реєстрації.
        </div>
      </div>
    );
  }

  return (
    <>
      <Form formik={formik}>
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
            name="password1"
            className="intro-x login__input border-gray-300 block"
            placeholder="Пароль"
            formik={formik}
          />
          <PasswordSecure level={psswdSec} />
          <div className="intro-x text-gray-600 block mt-2 text-xs sm:text-sm cursor-pointer">
            Що таке безпечний пароль?
          </div>
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
            Я згідний з
          </label>
          <a className="text-theme-1 ml-1" href="#?">Політикою конфіденційності</a>.
        </div>
        {formik.touched.accept_policy && formik.errors.accept_policy && (
          <label className="error" htmlFor="accept_policy">{formik.errors.accept_policy}</label>
        )}
        <div className="xl:flex intro-x mt-5 xl:mt-8 text-center xl:text-left">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            className="xl:flex-1 w-full xl:w-none text-white bg-theme-1 mr-3"
            // size="lg"
            variant="primary"
          >
            Зареєструватись
          </Button>
          <Button
            className="xl:flex-1 w-full xl:w-none xl:w-32 border-gray-300 mt-3 xl:mt-0"
            // size="lg"
            variant="secondary"
            link="/auth/sign-in/"
          >
            Повернутись
          </Button>
        </div>
        {/* <GoogleButton>Продовжити з Google</GoogleButton> */}
      </Form>
    </>
  );
};

SignUpForm.propTypes = {};

export default SignUpForm;
