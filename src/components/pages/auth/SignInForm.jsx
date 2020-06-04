import React from 'react';
import TextInput from 'components/form-components/TextInput';
import BooleanInput from 'components/form-components/BooleanInput';
import Button from 'components/form-components/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Form from 'components/form-components/Form';
import { useDispatch } from 'react-redux';
import { setUserData } from 'store/user/actionCreators';
import GoogleButton from 'components/pages/auth/GoogleButton';
// import Api from 'api';

// TODO: finish LoginForm
const SignInForm = () => {
  const dispatch = useDispatch();

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
      setTimeout(() => {
        // TODO: ajax login request
        // next code only for testing
        const success = true;

        if (success) {
          const testToken = 'asdasdqrqtslsdkmof.fsjdfosie.splgmoejplvmslkapd';
          window.localStorage.setItem('token', testToken);
          // Api.get('hello/');
          dispatch(setUserData({
            isLoggedIn: true,
            email: 'admin@admin.com',
            firstName: 'Roman',
            lastName: 'Tiukh',
            role: 'admin',
          }));
        } else {
          actions.setFieldError('password', 'Невірний логін або пароль');
        }
        actions.setSubmitting(false);
      }, 2000);
    },
  });

  return (
    <Form formik={formik}>
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Вхід
      </h2>
      <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
        A few more clicks to sign in to your
        account. Manage all your e-commerce accounts in one place
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
          className="intro-x login__input border-gray-300 block mt-4"
          size="lg"
          placeholder="Пароль"
          formik={formik}
        />
      </div>
      <div className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
        <BooleanInput
          className="mr-auto"
          name="remember_me"
          label="Remember me"
          formik={formik}
        />
        <Link to="/auth/restore-pass/">Забули пароль?</Link>
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          isLoading={formik.isSubmitting}
          className="xl:w-32 xl:mr-3"
          width="w-full"
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
      <GoogleButton>Продовжити з Google</GoogleButton>
      <div className="intro-x mt-10 xl:mt-18 text-gray-700 text-center xl:text-left">
        By signin up, you agree to our
        <br />
        <a
          className="text-theme-1"
          href="#?"
        >
          Terms and Conditions
        </a>
        {' & '}
        <a className="text-theme-1" href="#?">
          Privacy Policy
        </a>
      </div>
    </Form>
  );
};

SignInForm.propTypes = {};

export default SignInForm;
