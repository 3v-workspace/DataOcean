import React from 'react';
import Button from 'components/form-components/Button';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import { useFormik } from 'formik';
import Yup, { getPasswordLevel } from 'utils/yup';
import Form from 'components/form-components/Form';
import TextInput from 'components/form-components/TextInput';
import Api, { passErrorsToFormik } from 'api';
import { setUserData } from 'store/user/actionCreators';
import { useDispatch } from 'react-redux';

const ChangePasswordBlock = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password1: '',
      new_password2: '',
    },
    validate: (values) => {
      const errors = {};
      const { new_password1, new_password2 } = values;
      const level = getPasswordLevel(new_password1);
      if (level < 2) {
        errors.new_password1 = 'Пароль занадто простий';
      }
      if (new_password1 !== new_password2) {
        errors.new_password2 = 'Паролі не співпадають';
      }
      return errors;
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required(),
      new_password1: Yup.string().required().min(6),
      new_password2: Yup.string().required().min(6),
    }),
    onSubmit: (values, actions) => {
      Api.post('rest-auth/password/change/', values)
        .then((response) => {
          dispatch(setUserData(response.data));
        })
        .catch((error) => {
          passErrorsToFormik(error, formik);
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <TabContentBlock title="Змінити пароль">
      <Form formik={formik}>
        <TextInput
          autoComplete="on"
          label="Старий пароль"
          type="password"
          name="old_password"
          formik={formik}
        />
        <TextInput
          autoComplete="on"
          label="Новий пароль"
          type="password"
          name="new_password1"
          formik={formik}
        />
        <TextInput
          autoComplete="on"
          label="Підтвердження паролю"
          type="password"
          name="new_password2"
          formik={formik}
        />
        <div className="mt-5 xl:mt-8 xl:text-left">
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
