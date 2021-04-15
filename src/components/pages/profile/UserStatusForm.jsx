import React from 'react';
import { SelectInput, Form, Button, TextInput } from 'components/form-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { setUserData } from 'store/user/actionCreators';
import Api, { passErrorsToFormik } from 'api';
import PropTypes from 'prop-types';
import { usersStatus } from 'const/usersStatus';

const UserStatusForm = (props) => {
  const { onSubmit } = props;
  const user = useSelector((store) => store.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      person_status: user.person_status,
      iban: user.iban,
      company_name: user.company_name,
      company_address: user.company_address,
      identification_code: user.identification_code,
      mfo: user.mfo,
    },
    onSubmit: (values, actions) => {
      Api.patch('rest-auth/user/', values)
        .then((response) => {
          dispatch(setUserData(response.data));
          onSubmit();
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
    <Form formik={formik}>
      <SelectInput
        required
        formik={formik}
        name="person_status"
        options={[
          { value: usersStatus.INDIVIDUAL, label: t('individual') },
          { value: usersStatus.INDIVIDUAL_ENTREPRENEUR, label: t('individualEntrepreneur') },
          { value: usersStatus.LEGAL_ENTITY, label: t('legalEntity') },
        ]}
        label={t('personStatus')}
      />
      {formik.values.person_status !== usersStatus.INDIVIDUAL && (
        <>
          <TextInput
            required
            formik={formik}
            name="company_name"
            label={t('companyName')}
          />
          <TextInput
            required
            formik={formik}
            name="identification_code"
            label={formik.values.person_status === usersStatus.INDIVIDUAL_ENTREPRENEUR ? t('itn') : t('edrpou')}
          />
          <TextInput
            required
            formik={formik}
            name="company_address"
            label={t('registrationAddress')}
          />
          <TextInput
            required
            formik={formik}
            name="iban"
            label={t('iban')}
          />
          <TextInput
            required
            formik={formik}
            name="mfo"
            label={t('mfo')}
          />
        </>
      )}
      <Button
        disabled={formik.isSubmitting}
        isLoading={formik.isSubmitting}
        type="submit"
      >
        {t('save')}
      </Button>
    </Form>
  );
};

UserStatusForm.propTypes = {
  onSubmit: PropTypes.func,
};

UserStatusForm.defaultProps = {
  onSubmit: () => {},
};

export default UserStatusForm;
