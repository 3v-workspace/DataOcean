import React, { useState } from 'react';
import TextInput from 'components/form-components/TextInput';
import Button from 'components/form-components/Button';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from 'components/form-components/Form';
import { useFormik } from 'formik';
import Yup from 'utils/yup';

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
      email: Yup.string().required().email(),
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
          size="lg"
          placeholder="Email"
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
      code: Yup.string().required().length(4),
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
          size="lg"
          placeholder="Код з email листа"
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
      password: Yup.string().required(),
      password2: Yup.string().required(),
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

RestorePassword.propTypes = {};

export default RestorePassword;
