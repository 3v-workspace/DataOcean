import React, { useState, useEffect } from 'react';
import Button from 'components/form-components/Button';
import TextInput from 'components/form-components/TextInput';
import { useFormik } from 'formik';
import Form from 'components/form-components/Form';
import Api from 'api';
import Yup from 'utils/yup';
import { useTranslation } from 'react-i18next';
import SelectInput from 'components/form-components/SelectInput';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField, toTitleCase } from 'utils';

const PersonSearchForm = (props) => {
  const { history } = props;
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    Api.get('country/')
      .then((resp) => {
        setCountries(resp.data.map((country) => ({
          label: toTitleCase(getLocaleField(country, 'name')),
          value: country.id,
        })));
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      last_name: '',
      first_name: '',
      middle_name: '',
      country_id: '',
    },
    validationSchema: Yup.object({
      last_name: Yup.string().required(),
      first_name: Yup.string(),
      middle_name: Yup.string(),
      country_id: Yup.number().nullable(),
    }),
    onSubmit: (values) => {
      const params = new URLSearchParams();
      Object.entries(values).forEach(([key, value]) => {
        params.append(key, value);
      });
      history.push(`/system/home/person-search/?${params.toString()}`);
    },
  });

  return (
    <div className="flex justify-center">
      <Form formik={formik} className="w-72 mt-6">
        <TextInput
          required
          name="last_name"
          label={t('lastName')}
          className="login__input border-gray-300 block"
          placeholder={t('lastName')}
          formik={formik}
        />
        <TextInput
          name="first_name"
          label={t('firstName')}
          className="login__input border-gray-300 block"
          placeholder={t('firstName')}
          formik={formik}
        />
        <TextInput
          name="middle_name"
          label={t('middleName')}
          className="login__input border-gray-300 block"
          placeholder={t('middleName')}
          formik={formik}
        />
        <SelectInput
          name="country_id"
          label={t('countriesOfCitizenship')}
          placeholder={t('selectCitizenship')}
          options={countries}
          formik={formik}
        />
        <Button
          type="submit"
          className="w-full text-white bg-theme-1 p-3 mt-6"
        >
          {t('search')}
        </Button>
      </Form>
    </div>
  );
};

PersonSearchForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default PersonSearchForm;
