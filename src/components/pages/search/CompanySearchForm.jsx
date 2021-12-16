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

const CompanySearchForm = (props) => {
  const { history } = props;
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    Api.get('country/')
      .then((resp) => {
        setCountries(resp.data.map((country) => ({
          label: getLocaleField(country, 'name'),
          value: country.id,
        })));
      });
  }, []);


  const formik = useFormik({
    initialValues: {
      name: '',
      edrpou: '',
      country_id: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().when('edrpou', {
        is: undefined,
        then: Yup.string().required(t('bothFieldsCantBeEmpty')),
        otherwise: Yup.string(),
      }),
      edrpou: Yup.number().when('name', {
        is: undefined,
        then: Yup.number().required(t('oneFieldRequired')),
        otherwise: Yup.number(),
      }),
      country_id: Yup.number().nullable(),
    },
    [['name', 'edrpou']]),
    onSubmit: (values) => {
      const params = new URLSearchParams();
      Object.entries(values).forEach(([key, value]) => {
        params.append(key, value);
      });
      history.push(`/system/home/company-search/?${params.toString()}`);
    },
  });

  return (
    <div className="flex justify-center">
      <Form formik={formik} className="w-72 mt-6">
        <TextInput
          name="name"
          label={t('companyName')}
          className="login__input border-gray-300 block"
          placeholder={t('companyName')}
          formik={formik}
        />
        <TextInput
          name="edrpou"
          label={t('identificationNumber')}
          className="login__input border-gray-300 block"
          placeholder={t('identificationNumber')}
          formik={formik}
        />
        <SelectInput
          name="country_id"
          label={t('countryOfRegistration')}
          placeholder={t('countryOfRegistration')}
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

CompanySearchForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default CompanySearchForm;
