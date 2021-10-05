import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField, renderDate } from 'utils';
import { renderCondition } from 'utils/conditions';

const CompanySanctionList = ({ match, history }) => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('companyName'),
      prop: 'name',
      defaultSelected: true,
      filter: {
        name: 'name',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('countryOfRegistration'),
      prop: 'country_of_registration',
      noSort: true,
      defaultSelected: true,
      render: (v) => getLocaleField(v, 'name'),
      filter: {
        name: 'country_of_registration',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('taxpayerNumber'),
      prop: 'taxpayer_number',
      noSort: true,
      defaultSelected: true,
      filter: {
        name: 'taxpayer_number',
        type: 'number',
        placeholder: '1234567890',
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
      render: (v, row) => renderCondition(row),
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
      header: t('nameOriginal'),
      prop: 'name_original',
      noSort: true,
      filter: {
        name: 'name_original',
        type: 'text',
        placeholder: t('search'),
      },
    },
    {
      header: t('additionalInfo'),
      prop: 'additional_info',
      noSort: true,
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
      prop: 'registration_number',
      noSort: true,
      filter: {
        name: 'registration_number',
        type: 'text',
        placeholder: '1234567890123',
        width: '40',
      },
    },
    {
      header: t('cancelingConditions'),
      prop: 'cancellation_condition',
      noSort: true,
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
        minHeight="400px"
      />
    </PageBox>
  );
};

CompanySanctionList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default CompanySanctionList;
