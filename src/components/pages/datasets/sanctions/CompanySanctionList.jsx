import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField, renderDate } from 'utils';


const CompanySanctionList = ({ match, history }) => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('companyName'),
      defaultSelected: true,
      prop: 'name',
      filter: {
        name: 'name',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('countryOfRegistration'),
      defaultSelected: true,
      prop: 'country_of_registration',
      noSort: true,
      render: (v) => getLocaleField(v, 'name'),
      filter: {
        name: 'country_of_registration',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('taxpayerNumber'),
      defaultSelected: true,
      noSort: true,
      prop: 'taxpayer_number',
      filter: {
        name: 'taxpayer_number',
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
      header: t('address'),
      noSort: true,
      prop: 'address',
      filter: {
        name: 'address',
        type: 'text',
        placeholder: 'Пошук',
      },
    },
    {
      header: t('reasoningDate'),
      prop: 'reasoning_date',
      render: (v) => renderDate(v),
      noSort: true,
    },
    {
      header: 'ID',
      prop: 'id',
      noSort: true,
      filter: {
        name: 'id',
        type: 'number',
        placeholder: t('search'),
      },
    },
    {
      header: t('nameOriginal'),
      prop: 'name_original',
      noSort: true,
      filter: {
        name: 'name_original',
        type: 'number',
        placeholder: t('search'),
      },
    },
    {
      header: t('additionalInfo'),
      noSort: true,
      prop: 'additional_info',
      filter: {
        name: 'additional_info',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('registrationDate'),
      prop: 'registration_date',
      noSort: true,
      render: (v) => renderDate(v),
    },
    {
      header: t('registrationNumber'),
      noSort: true,
      prop: 'registration_number',
      filter: {
        name: 'registration_number',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('cancelingConditions'),
      noSort: true,
      prop: 'cancellation_condition',
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="sanction/company/"
        fields={[
          'name',
          'country_of_registration',
          'taxpayer_number',
          'start_date',
          'end_date',
          'address',
          'reasoning_date',
          'id',
          'name_original',
          'additional_info',
          'registration_date',
          'registration_number',
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

CompanySanctionList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default CompanySanctionList;
