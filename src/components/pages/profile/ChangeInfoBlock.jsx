import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Button from 'components/form-components/Button';
import Form from 'components/form-components/Form';
import TextInput from 'components/form-components/TextInput';
import { setUserData } from 'store/user/actionCreators';
import TabContentBlock from 'components/pages/profile/TabContentBlock';

const ChangeInfoBlock = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      company_name: user.company_name,
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      company_name: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      // TODO: post data to the backend and save to state from response
      dispatch(setUserData(values));
      actions.setSubmitting(false);
    },
  });

  return (
    <TabContentBlock title="Змінити інформацію користувача">
      <Form formik={formik}>
        <TextInput
          label="Email"
          type="email"
          name="email"
          formik={formik}
        />
        <TextInput
          label="Ім'я"
          name="first_name"
          formik={formik}
        />
        <TextInput
          label="Прізвище"
          name="last_name"
          formik={formik}
        />
        <TextInput
          label="Компанія"
          name="company_name"
          formik={formik}
        />
        <div className="mt-5 xl:mt-8 text-center xl:text-left">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            className="text-white bg-theme-1 mr-3"
            // size="lg"
            variant="primary"
          >
            Зберегти
          </Button>
        </div>
      </Form>
    </TabContentBlock>
  );
};

export default ChangeInfoBlock;
