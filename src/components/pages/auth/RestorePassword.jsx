import React, { useEffect, useState } from 'react';
import TextInput from 'components/form-components/TextInput';
import Button from 'components/form-components/Button';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';
import Form from 'components/form-components/Form';
import { useFormik } from 'formik';
import Yup, { getPasswordLevel } from 'utils/yup';
import Api, { passErrorsToFormik } from 'api';
import { ReactRouterPropTypes } from 'utils/prop-types';

const stages = {
  START: 'START',
  RESTORE: 'RESTORE',
};

const EmailForm = () => {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
    }),
    onSubmit: (values, action) => {
      Api.post('rest-auth/password/reset/', values)
        .then(() => {
          setSent(true);
        })
        .catch((error, actions) => {
          passErrorsToFormik(error, formik);
          if (error.response && error.response.data.detail) {
            actions.setFieldError('email', error.response.data.detail);
          }
        })
        .finally(() => {
          action.setSubmitting(false);
        });
    },
  });

  if (sent) {
    return (
      <div>
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Перевірте пошту
        </h2>
        <div className="intro-x mt-2 text-gray-500 text-center">
          На ваш email було надіслано повідомлення з інструкціями для відновлення паролю.
        </div>
      </div>
    );
  }
  return (
    <Form formik={formik}>
      <div className="intro-x mt-8">
        <TextInput
          className="intro-x login__input border-gray-300 block"
          name="email"
          type="email"
          size="lg"
          placeholder="Email"
          formik={formik}
        />
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          className="xl:w-1/2 xl:mr-3"
          disabled={formik.isSubmitting}
          isLoading={formik.isSubmitting}
          // size="lg"
          width="w-full"
        >
          Відновити пароль
        </Button>
      </div>
    </Form>
  );
};


const RestoreForm = ({ uid, token }) => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push('/auth/sign-in/');
      }, 4000);
    }
  }, [success]);

  const formik = useFormik({
    initialValues: {
      password1: '',
      password2: '',
    },
    validate: (values) => {
      const errors = {};
      const { password1, password2 } = values;
      if (password1) {
        const level = getPasswordLevel(password1);
        if (level < 2) {
          errors.password1 = 'Пароль занадто простий';
        }
      }
      if (password1 !== password2) {
        errors.password2 = 'Паролі не співпадають';
      }
      return errors;
    },
    validationSchema: Yup.object({
      password1: Yup.string().required(),
      password2: Yup.string().required(),
    }),
    onSubmit: (values, actions) => {
      Api.post('rest-auth/password/reset/confirm/', {
        new_password1: values.password1,
        new_password2: values.password2,
        uid,
        token,
      })
        .then(() => {
          setSuccess(true);
        })
        .catch((error) => {
          passErrorsToFormik(error, formik);
          if (error.response && error.response.data.detail) {
            actions.setFieldError('password2', error.response.data.detail);
          }
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  if (success) {
    return (
      <div>
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Успішно!
        </h2>
        <div className="intro-x mt-2 text-gray-500 text-center">
          Через декілька секунд вас буде перенаправлено на сторінку входу.
        </div>
      </div>
    );
  }

  return (
    <Form formik={formik}>
      <div className="intro-x mt-8">
        <TextInput
          className="intro-x login__input border-gray-300 block"
          type="password"
          name="password1"
          size="lg"
          placeholder="Пароль"
          formik={formik}
        />
        <TextInput
          className="intro-x login__input border-gray-300 block"
          type="password"
          name="password2"
          size="lg"
          placeholder="Підтвердження паролю"
          formik={formik}
        />
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          className="xl:w-1/2 xl:mr-3"
          // size="lg"
          width="w-full"
        >
          Далі
        </Button>
      </div>
    </Form>
  );
};
RestoreForm.propTypes = {
  uid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const forms = {
  [stages.START]: EmailForm,
  [stages.RESTORE]: RestoreForm,
};

const RestorePassword = ({ match }) => {
  const { uid, token } = match.params;
  let start_stage = stages.START;
  if (uid && token) {
    start_stage = stages.RESTORE;
  }
  // const [stage, setStage] = useState(start_stage);
  const FormComponent = forms[start_stage];

  if (!FormComponent) {
    return <Redirect to="/404/" />;
  }

  return (
    <>
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Відновлення паролю
      </h2>
      <FormComponent
        uid={uid}
        token={token}
      />
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          className="xl:w-32 xl:mr-3"
          variant="secondary"
          width="w-full"
          link="/auth/sign-in/"
        >
          Вхід
        </Button>
        <Button
          className="xl:w-32 xl:mr-3"
          variant="secondary"
          width="w-full"
          link="/auth/sign-up/"
        >
          Реєстрація
        </Button>
      </div>
    </>
  );
};

RestorePassword.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default RestorePassword;
