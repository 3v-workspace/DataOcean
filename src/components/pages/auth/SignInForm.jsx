import React from 'react';
import TextInput from 'components/form-components/TextInput';
import BooleanInput from 'components/form-components/BooleanInput';
import Button from 'components/form-components/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Form from 'components/form-components/Form';
import { useDispatch } from 'react-redux';
import { userLogin } from 'store/user/actionCreators';
import GoogleButton from 'components/pages/auth/GoogleButton';
import Api from 'api';

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
      Api.post('rest-auth/login/', values)
        .then((resp) => {
          const { user, key } = resp.data;
          window.localStorage.setItem('token', key);
          dispatch(userLogin(user));
        })
        .catch(({ response }) => {
          if (response && response.data && response.data.non_field_errors) {
            actions.setFieldError('password', 'Невірний логін або пароль');
          }
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
      // actions.setFieldError('password', 'Невірний логін або пароль');
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
          label="Запам'ятати мене"
          formik={formik}
        />
        <Link to="/auth/restore-pass/" class="text-theme-1">Забули пароль?</Link>
      </div>
      <div className="intro-x xl:flex mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          isLoading={formik.isSubmitting}
          className="flex-1 xl:w-2/5 xl:mr-3"
          width="w-full"
        >
          Увійти
        </Button>
        <Button
          className="flex-1 xl:w-2/5 mt-3 xl:mt-0"
          // variant="secondary"
          width="w-full"
          link="/auth/sign-up/"
        >
          Реєстрація
        </Button>
      </div>
      <GoogleButton>Продовжити з Google</GoogleButton>
      <div className="intro-x mt-10 xl:mt-18 text-gray-700 text-center xl:text-left">
        Зареєструвавшись, ви погоджуєтесь з нашими
        <br />
        <a
          className="text-theme-1"
          href="#?"
        >
          Правилами та умовами
        </a>
        {' & '}
        <a className="text-theme-1" href="#?">
          Політикою конфіденційності
        </a>
      </div>
    </Form>
  );
};

SignInForm.propTypes = {};

export default SignInForm;
