import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Yup from 'utils/yup';

import Button from 'components/form-components/Button';
import Form from 'components/form-components/Form';
import TextInput from 'components/form-components/TextInput';
import { setUserData } from 'store/user/actionCreators';

const ProfileEdit = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      company_name: user.company_name,
      email: user.email,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      company_name: Yup.string(),
      email: Yup.string().required().email(),
    }),
    onSubmit: (values, actions) => {
      // TODO: post data to the backend and save to state from response
      dispatch(setUserData(values));
      actions.setSubmitting(false);
    },
  });

  return (
    <Form formik={formik} className="intro-x mt-8 xl:max-w-xs">
      <div className="intro-x mt-8">
        <TextInput
          label="Email"
          type="email"
          size="sm"
          name="email"
          className="intro-x login__input border-gray-300 block"
          placeholder="Email"
          formik={formik}
        />
        <TextInput
          label="Ім'я"
          size="sm"
          name="first_name"
          className="intro-x login__input border-gray-300 block"
          placeholder="Ім'я"
          formik={formik}
        />
        <TextInput
          label="Прізвище"
          size="sm"
          name="last_name"
          className="intro-x login__input border-gray-300 block"
          placeholder="Прізвище"
          formik={formik}
        />
        <TextInput
          label="Компанія"
          size="sm"
          name="company_name"
          className="intro-x login__input border-gray-300 block"
          placeholder="Компанія"
          formik={formik}
        />
      </div>
      <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          isLoading={formik.isSubmitting}
          className="text-white bg-theme-1 mr-3"
          size="lg"
          variant="primary"
        >
          Зберегти
        </Button>
      </div>
    </Form>
  );
};

export default ProfileEdit;
