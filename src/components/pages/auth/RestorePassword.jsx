import React, { useState } from 'react';
import TextInput from 'components/form-components/TextInput';
import Button from 'components/form-components/Button';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from 'components/form-components/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const stages = {
  START: 'START',
  CODE: 'CODE',
  RESTORE: 'RESTORE',
};

const EmailForm = ({ setStage }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Поле не може бути пусте')
        .email('Не коректний Email'),
    }),
    onSubmit: () => {
      // TODO:
      setStage(stages.CODE);
    },
  });

  return (
    <Form formik={formik}>
      <div className="intro-x mt-8">
        <TextInput
          className="intro-x login__input border-gray-300 block"
          name="email"
          type="email"
          placeholder="Email"
          formik={formik}
        />
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          className="xl:w-1/2 xl:mr-3"
          size="lg"
          width="w-full"
        >
          Відновити пароль
        </Button>
      </div>
    </Form>
  );
};
EmailForm.propTypes = { setStage: PropTypes.func.isRequired };

const CodeForm = ({ setStage }) => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required('Поле не може бути пусте')
        .length(4, 'Поле має містити 4 символи'),
    }),
    onSubmit: () => {
      // TODO:
      setStage(stages.RESTORE);
    },
  });

  return (
    <Form formik={formik}>
      <div className="intro-x mt-8">
        <TextInput
          className="intro-x login__input border-gray-300 block"
          name="code"
          type="text"
          placeholder="Код з email листа"
          formik={formik}
        />
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          className="xl:w-1/2 xl:mr-3"
          size="lg"
          width="w-full"
        >
          Далі
        </Button>
      </div>
    </Form>
  );
};
CodeForm.propTypes = { setStage: PropTypes.func.isRequired };

const RestoreForm = ({ setStage }) => {
  const formik = useFormik({
    initialValues: {
      password: '',
      password2: '',
    },
    validate: (values) => {
      const errors = {};
      const { password, password2 } = values;
      if (password !== password2) {
        errors.password2 = 'Паролі не співпадають.';
      }
      return errors;
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Поле не може бути пусте'),
      password2: Yup.string().required('Поле не може бути пусте'),
    }),
    onSubmit: () => {
      // TODO:
      setStage(stages.CODE);
    },
  });

  return (
    <Form formik={formik}>
      <div className="intro-x mt-8">
        <TextInput
          className="intro-x login__input border-gray-300 block"
          type="password"
          name="password"
          placeholder="Пароль"
          formik={formik}
        />
        <TextInput
          className="intro-x login__input border-gray-300 block"
          type="password"
          name="password2"
          placeholder="Підтвердження паролю"
          formik={formik}
        />
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          className="xl:w-1/2 xl:mr-3"
          size="lg"
          width="w-full"
        >
          Далі
        </Button>
      </div>
    </Form>
  );
};
RestoreForm.propTypes = { setStage: PropTypes.func.isRequired };

const forms = {
  [stages.START]: EmailForm,
  [stages.CODE]: CodeForm,
  [stages.RESTORE]: RestoreForm,
};

const RestorePassword = () => {
  const [stage, setStage] = useState(stages.START);

  const FormComponent = forms[stage];
  if (!FormComponent) {
    return <Redirect to="/404/" />;
  }

  return (
    <>
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Відновлення паролю
      </h2>
      <FormComponent
        setStage={setStage}
      />
    </>
  );
};

RestorePassword.propTypes = {};

export default RestorePassword;
