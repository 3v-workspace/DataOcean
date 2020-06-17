import React from 'react';
import Button from 'components/form-components/Button';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import { useFormik } from 'formik';
import Yup, { getPasswordLevel } from 'utils/yup';
import Form from 'components/form-components/Form';
import TextInput from 'components/form-components/TextInput';

const ChangePasswordBlock = () => {
  const formik = useFormik({
    initialValues: {
      old_password: '',
      password1: '',
      password2: '',
    },
    validate: (values) => {
      const errors = {};
      const { password1, password2 } = values;
      const level = getPasswordLevel(password1);
      if (level < 2) {
        errors.password1 = 'Пароль занадто простий';
      }
      if (password1 !== password2) {
        errors.password2 = 'Паролі не співпадають';
      }
      return errors;
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required(),
      password1: Yup.string().required().min(6),
      password2: Yup.string().required().min(6),
    }),
    onSubmit: (values, actions) => {
      // TODO: post data to the backend and save to state from response
      actions.setSubmitting(false);
    },
  });

  return (
    <TabContentBlock title="Змінити пароль">
      <Form formik={formik}>
        <TextInput
          label="Старий пароль"
          type="password"
          name="old_password"
          formik={formik}
        />
        <TextInput
          label="Новий пароль"
          type="password"
          name="password1"
          formik={formik}
        />
        <TextInput
          label="Підтвердження паролю"
          type="password"
          name="password2"
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

export default ChangePasswordBlock;
