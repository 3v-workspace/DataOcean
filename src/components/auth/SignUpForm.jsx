import React, { useState } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

  const SignUpForm = () => {

    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
  
    const onSubmit = (e) => {
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
            <form className="login-container" >
              <input
                type="text"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setLastname(value)}
                placeholder="Прізвище"
                name="lastname"
                value={lastname}
              />
              <input
                type="text"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setFirstname(value)}
                placeholder="Ім'я"
                name="firstname"
                value={firstname}
              />
              <input
                type="text"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setSurname(value)}
                placeholder="По-батькові (не обов'язково)"
                name="surname"
                value={surname}
              />
              <input
                type="text"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setCompany(value)}
                placeholder="Назва компанії"
                name="company"
                value={company}
              />
              <input
                type="email"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Електронна пошта"
                name="email"
                value={email}
              />
              <input
                type="password"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Пароль"
                name="password"
                value={password}
              />
              <input
                type="password"
                className="input w-full border mt-2"
                onChange={({ target: { value } }) => setPassword2(value)}
                placeholder="Повторіть пароль"
                name="password2"
                value={password2}
              />
              <div className="flex items-center text-gray-700 mt-5">
                <label className="cursor-pointer select-none">
                  <input type="checkbox" className="input border mr-2" id="vertical-remember-me"/> 
                    Реєструючись, Ви погоджуєтесь із призначеною для користувача угодою
                  </label>
              </div>
              <button
                type="button"
                className="button bg-theme-1 text-white mt-5"
                onClick={onSubmit}
                >
                  Зареєструватись
              </button>
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
