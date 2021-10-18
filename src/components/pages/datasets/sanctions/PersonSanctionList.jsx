import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField, isPep, renderDate } from 'utils';

const PersonSanctionList = ({ match, history }) => {
  const { t } = useTranslation();

  const columns = [
    {
      header: t('fullName'),
      prop: 'full_name',
      defaultSelected: true,
      filter: {
        name: 'full_name',
        type: 'text',
        placeholder: t('search'),
        width: '40',
      },
    },
    {
      header: t('dateOfBirth'),
      prop: 'date_of_birth',
      noSort: true,
      defaultSelected: true,
      render: (v) => renderDate(v),
    },
    {
      header: t('countriesOfCitizenship'),
      prop: 'countries_of_citizenship',
      noSort: true,
      defaultSelected: true,
      render: (countries) => countries.map((country) => getLocaleField(country, 'name')).join(', '),
      filter: {
        name: 'country_of_citizenship',
        prop: null,
        type: 'text',
        placeholder: t('search'),
        width: '40',
      },
    },
    {
      header: t('startDate'),
      prop: 'start_date',
      defaultSelected: true,
      render: (v) => renderDate(v),
    },
    {
      header: t('endDate'),
      prop: 'end_date',
      defaultSelected: true,
      render: (v) => renderDate(v),
    },
    {
      header: t('status'),
      prop: 'is_pep',
      noSort: true,
      defaultSelected: true,
      render: (v) => isPep(v),
    },
    {
      header: t('lastPosition'),
      prop: 'occupation',
      noSort: true,
      defaultSelected: true,
    },
    {
      header: t('taxpayerNumber'),
      prop: 'taxpayer_number',
      noSort: true,
      filter: {
        name: 'taxpayer_number',
        type: 'number',
        placeholder: '123456789012',
        width: '40',
      },
    },
    {
      header: t('reasoningDate'),
      prop: 'reasoning_date',
      noSort: true,
      render: (v) => renderDate(v),
    },
    {
      header: 'ID',
      prop: 'id',
      noSort: true,
      filter: {
        name: 'id',
        type: 'number',
        placeholder: '1234',
        width: '24',
      },
    },
    {
      header: t('fullNameOriginal'),
      prop: 'full_name_original',
      noSort: true,
      filter: {
        name: 'full_name_original',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('address'),
      prop: 'address',
      noSort: true,
      filter: {
        name: 'address',
        type: 'text',
        placeholder: t('search'),
        width: '40',
      },
    },
    {
      header: t('documentsInfo'),
      prop: 'passports',
      noSort: true,
      render: (passports) => passports.map((passport) => passport).join(', '),
      filter: {
        name: 'passports',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('additionalInfo'),
      prop: 'additional_info',
      noSort: true,
    },
    {
      header: t('placeOfBirth'),
      prop: 'place_of_birth',
      noSort: true,
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="sanction/person/"
        fields={[
          'full_name',
          'date_of_birth',
          'countries_of_citizenship',
          'start_date',
          'end_date',
          'is_pep',
          'occupation',
          'taxpayer_number',
          'reasoning_date',
          'id',
          'full_name_original',
          'address',
          'passports',
          'additional_info',
          'types_of_sanctions',
          'place_of_birth',
          'cancellation_condition',
        ]}
        axiosConfigs={{ useProjectToken: true }}
        onRowClick={(row) => {
          history.push(`${match.url}${row.id}/`);
        }}
      />
    </PageBox>
  );
};

PersonSanctionList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PersonSanctionList;
