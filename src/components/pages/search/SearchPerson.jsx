import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Button from 'components/form-components/Button';
import TextInput from 'components/form-components/TextInput';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Form from 'components/form-components/Form';
import Api from 'api';
import Yup from 'utils/yup';
import { useTranslation } from 'react-i18next';
import SelectInput from 'components/form-components/SelectInput';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField, toTitleCase } from 'utils';

const SearchPerson = (props) => {
  const { history, match } = props;
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([{ label: '', value: '' }]);
  useEffect(() => {
    Api.get('/country')
      .then((resp) => {
        setCountries([{ label: '', value: '' }, ...resp.data.map((country) => ({
          label: toTitleCase(getLocaleField(country, 'name')),
          value: country.id,
        }))]);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      last_name: '',
      first_name: '',
      middle_name: '',
      country: null,
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    validationSchema: Yup.object({
      last_name: Yup.string().required(),
      first_name: Yup.string(),
      middle_name: Yup.string(),
      country: Yup.number(),
    }),
    onSubmit: (values, actions) => {
      const params = new URLSearchParams('');
      Object.entries(values).forEach((param) => params.append(param[0], param[1]));
      history.push(`/home/person-search/?${params.toString()}`);
    },
  });

  return (
    <div className="flex justify-center">
      <Form formik={formik} className="w-64 mt-6">
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
          name="country"
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

SearchPerson.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default SearchPerson;
