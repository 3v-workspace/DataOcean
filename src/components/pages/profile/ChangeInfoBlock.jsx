import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Button from 'components/form-components/Button';
import Form from 'components/form-components/Form';
import TextInput from 'components/form-components/TextInput';
import { setUserData } from 'store/user/actionCreators';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import DateInput from 'components/form-components/DateInput';
import Api, { passErrorsToFormik } from 'api';
import { useTranslation } from 'react-i18next';

const ChangeInfoBlock = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      organization: user.organization,
      position: user.position,
      date_of_birth: user.date_of_birth,
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      first_name: Yup.string().name().required().min(2),
      last_name: Yup.string().name().required().min(2),
      organization: Yup.string().min(2),
      position: Yup.string().min(2),
      date_of_birth: Yup.date().nullable(),
    }),
    onSubmit: (values, actions) => {
      Api.patch('rest-auth/user/', values)
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
    <TabContentBlock title={t('changeUserInfo')}>
      <Form formik={formik}>
        <TextInput
          required
          label="Email"
          type="email"
          name="email"
          formik={formik}
        />
        <TextInput
          required
          label={t('firstName')}
          name="first_name"
          formik={formik}
        />
        <TextInput
          required
          label={t('lastName')}
          name="last_name"
          formik={formik}
        />
        <TextInput
          label={t('organization')}
          name="organization"
          formik={formik}
        />
        <TextInput
          label={t('position')}
          name="position"
          formik={formik}
        />
        <DateInput
          label={t('dateOfBirth')}
          name="date_of_birth"
          drops="up"
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
            {t('save')}
          </Button>
        </div>
      </Form>
    </TabContentBlock>
  );
};

export default ChangeInfoBlock;
