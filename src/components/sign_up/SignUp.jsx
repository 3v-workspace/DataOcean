import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from '../../utils/react-router-prop-types';
// import './login-page.scss';

const SignUpPage = () => {
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

  // <div> <label>Email</label> <input type="email" class="input w-full border mt-2" placeholder="example@gmail.com"> </div> <div class="mt-3"> <label>Password</label> <input type="password" class="input w-full border mt-2" placeholder="secret"> </div> <div class="flex items-center text-gray-700 mt-5"> <input type="checkbox" class="input border mr-2" id="vertical-remember-me"> <label class="cursor-pointer select-none" for="vertical-remember-me">Remember me</label> </div> <button type="button" class="button bg-theme-1 text-white mt-5">Login</button> 

  return (
    <div className="login-page">
      <form className="login-container" >
        <input
          type="text"
          onChange={({ target: { value } }) => setLastname(value)}
          placeholder="Прізвище"
          name="lastname"
          value={lastname}
        />
        <input
          type="text"
          // className="input w-full border mt-2"
          onChange={({ target: { value } }) => setFirstname(value)}
          placeholder="Ім'я"
          name="firstname"
          value={firstname}
        />
        <input
          type="text"
          onChange={({ target: { value } }) => setSurname(value)}
          placeholder="По-батькові (не обов'язково)"
          name="surname"
          value={surname}
        />
        <input
          type="text"
          onChange={({ target: { value } }) => setCompany(value)}
          placeholder="Назва компанії"
          name="company"
          value={company}
        />
        <input
          type="email"
          onChange={({ target: { value } }) => setEmail(value)}
          placeholder="Електронна пошта"
          name="email"
          value={email}
        />
        <input
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          placeholder="Пароль"
          name="password"
          value={password}
        />
        <input
          type="password"
          onChange={({ target: { value } }) => setPassword2(value)}
          placeholder="Повторіть пароль"
          name="password2"
          value={password2}
        />
        <button
          type="button"
          onClick={onSubmit}
          >
            Зареєструватись
        </button>
      </form>
    </div>
  );
};

SignUpPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default SignUpPage;
