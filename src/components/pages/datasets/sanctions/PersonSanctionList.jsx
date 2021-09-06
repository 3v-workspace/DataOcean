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
      defaultSelected: true,
      prop: 'full_name',
      filter: {
        name: 'full_name',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('dateOfBirth'),
      defaultSelected: true,
      noSort: true,
      prop: 'date_of_birth',
      render: (v) => renderDate(v),
    },
    {
      header: t('countriesOfCitizenship'),
      defaultSelected: true,
      noSort: true,
      prop: 'countries_of_citizenship',
      render: (countries) => countries.map((country) => getLocaleField(country, 'name')).join(', '),
      filter: {
        name: 'country_of_citizenship',
        prop: null,
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('startDate'),
      defaultSelected: true,
      prop: 'start_date',
      render: (v) => renderDate(v),
    },
    {
      header: t('endDate'),
      defaultSelected: true,
      prop: 'end_date',
      render: (v) => renderDate(v),
    },
    {
      header: t('status'),
      defaultSelected: true,
      prop: 'is_pep',
      noSort: true,
      render: (v) => isPep(v),
    },
    {
      header: t('lastPosition'),
      defaultSelected: true,
      noSort: true,
      prop: 'occupation',
    },
    {
      header: t('taxpayerNumber'),
      noSort: true,
      prop: 'taxpayer_number',
      filter: {
        name: 'taxpayer_number',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('reasoningDate'),
      prop: 'reasoning_date',
      render: (v) => renderDate(v),
    },
    {
      header: 'ID',
      prop: 'id',
      filter: {
        name: 'id',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('fullNameOriginal'),
      prop: 'full_name_original',
      filter: {
        name: 'full_name_original',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('address'),
      noSort: true,
      prop: 'address',
      filter: {
        name: 'address',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('documentsInfo'),
      noSort: true,
      prop: 'passports',
      render: (passports) => passports.map((passport) => passport).join(', '),
      filter: {
        name: 'passports',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('additionalInfo'),
      noSort: true,
      prop: 'additional_info',
    },
    {
      header: t('placeOfBirth'),
      prop: 'place_of_birth',
    },
    {
      header: t('cancelingConditions'),
      defaultSelected: false,
      noSort: true,
      prop: 'cancellation_condition',
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
