import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Button from 'components/form-components/Button';
import Form from 'components/form-components/Form';
import { setUserData } from 'store/user/actionCreators';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import Api, { passErrorsToFormik } from 'api';
import { SelectInput } from 'components/form-components';
import { useTranslation } from 'react-i18next';
import setLanguage from 'utils/setLanguage';
import toast from 'utils/toast';

const ChangeLanguageBlock = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      language: user.language,
    },
    validationSchema: Yup.object({
      language: Yup.string().required(),
    }),
    onSubmit: (values, actions) => {
      Api.patch('rest-auth/user/', values)
        .then((response) => {
          dispatch(setUserData(response.data));
          setLanguage(response.data.language);
          toast('success', t('saved'), null, 2000);
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
    <TabContentBlock title={t('changeSystemLanguage')}>
      <Form formik={formik}>
        <SelectInput
          label={t('systemLanguage')}
          name="language"
          options={[
            { value: 'uk', label: 'Українська' },
            { value: 'en', label: 'English' },
          ]}
          formik={formik}
        />
        <div className="mt-5 xl:mt-8 xl:text-left">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            className="text-white bg-theme-1 mr-3"
            variant="primary"
          >
            {t('save')}
          </Button>
        </div>
      </Form>
    </TabContentBlock>
  );
};

export default ChangeLanguageBlock;
