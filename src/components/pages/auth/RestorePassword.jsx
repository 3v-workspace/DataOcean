import React, { useState } from 'react';
import TextInput from 'components/form-components/TextInput';
import Button from 'components/form-components/Button';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const stages = {
  START: 'START',
  CODE: 'CODE',
  RESTORE: 'RESTORE',
};

const EmailForm = ({ setStage }) => (
  <>
    <div className="intro-x mt-8">
      <TextInput
        className="intro-x login__input border-gray-300 block"
        name="email"
        type="email"
        placeholder="Email"
      />
    </div>
    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
      <Button
        className="xl:w-1/2 xl:mr-3"
        size="lg"
        width="w-full"
        onClick={() => setStage(stages.CODE)}
      >
        Відновити пароль
      </Button>
    </div>
  </>
);
EmailForm.propTypes = { setStage: PropTypes.func.isRequired };

const CodeForm = ({ setStage }) => (
  <>
    <div className="intro-x mt-8">
      <TextInput
        className="intro-x login__input border-gray-300 block"
        name="code"
        type="text"
        placeholder="Код з email листа"
      />
    </div>
    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
      <Button
        className="xl:w-1/2 xl:mr-3"
        size="lg"
        width="w-full"
        onClick={() => setStage(stages.RESTORE)}
      >
        Далі
      </Button>
    </div>
  </>
);
CodeForm.propTypes = { setStage: PropTypes.func.isRequired };

const RestoreForm = ({ setStage }) => (
  <>
    <div className="intro-x mt-8">
      <TextInput
        className="intro-x login__input border-gray-300 block"
        name="password1"
        type="password"
        placeholder="Пароль 1"
      />
      <TextInput
        className="intro-x login__input border-gray-300 block"
        name="password2"
        type="password"
        placeholder="Пароль 2"
      />
    </div>
    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
      <Button
        className="xl:w-1/2 xl:mr-3"
        size="lg"
        width="w-full"
        onClick={() => setStage(stages.RESTORE)}
      >
        Далі
      </Button>
    </div>
  </>
);
RestoreForm.propTypes = { setStage: PropTypes.func.isRequired };

const forms = {
  [stages.START]: EmailForm,
  [stages.CODE]: CodeForm,
  [stages.RESTORE]: RestoreForm,
};

const RestorePassword = () => {
  const [stage, setStage] = useState(stages.START);

  const Form = forms[stage];
  if (!Form) {
    return <Redirect to="/404/" />;
  }

  return (
    <>
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Відновлення паролю
      </h2>
      <Form
        setStage={setStage}
      />
    </>
  );
};

RestorePassword.propTypes = {};

export default RestorePassword;
