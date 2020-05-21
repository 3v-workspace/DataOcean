import React, { useState } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import BooleanInput from 'components/form-components/BooleanInput';
import Button from 'components/form-components/Button';
import TextInput from 'components/form-components/TextInput';

const SignUpForm = () => {

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = () => {
    console.log(firstname);
    console.log(lastname);
    console.log(surname);
    console.log(company);
    console.log(email);
    console.log(password);
    console.log(password2);
  };

  return (
    <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
      <div className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Sign Up
        </h2>
        <div className="login-page">
          <form className="login-container">
            <TextInput
              type="text"
              onChange={({ target: { value } }) => setLastname(value)}
              placeholder="Прізвище"
              name="lastname"
              value={lastname}
            />
            <TextInput
              type="text"
              onChange={({ target: { value } }) => setFirstname(value)}
              placeholder="Ім'я"
              name="firstname"
              value={firstname}
            />
            <TextInput
              type="text"
              onChange={({ target: { value } }) => setSurname(value)}
              placeholder="По-батькові (не обов'язково)"
              name="surname"
              value={surname}
            />
            <TextInput
              type="text"
              onChange={({ target: { value } }) => setCompany(value)}
              placeholder="Назва компанії"
              name="company"
              value={company}
            />
            <TextInput
              type="email"
              onChange={({ target: { value } }) => setEmail(value)}
              placeholder="Електронна пошта"
              name="email"
              value={email}
            />
            <TextInput
              type="password"
              onChange={({ target: { value } }) => setPassword(value)}
              placeholder="Пароль"
              name="password"
              value={password}
            />
            <TextInput
              type="password"
              onChange={({ target: { value } }) => setPassword2(value)}
              placeholder="Повторіть пароль"
              name="password2"
              value={password2}
            />
            <div className="flex items-center text-gray-700 mt-5">
                <BooleanInput
                  label="Реєструючись, Ви погоджуєтесь із призначеною для користувача угодою"
                />
            </div>
            <Button
              type="button"
              onClick={onSubmit}
              width="mt-8"
            >
              Зареєструватись
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  ...ReactRouterPropTypes,
};

export default SignUpForm;
