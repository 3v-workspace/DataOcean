import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';

const CountrySanctionList = ({ match, history }) => {
  const { t } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      noSort: true,
      defaultSelected: true,
    },
    {
      header: t('countryName'),
      prop: 'country',
      defaultSelected: true,
      filter: {
        name: 'country',
        type: 'text',
        placeholder: t('search'),
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
      header: t('reasoningDate'),
      prop: 'reasoning_date',
      noSort: true,
      defaultSelected: true,
      render: (v) => renderDate(v),
    },
    {
      header: t('cancelingConditions'),
      prop: 'cancellation_condition',
      noSort: true,
      filter: {
        name: 'cancellation_condition',
        type: 'text',
        placeholder: t('search'),
      },
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="sanction/country/"
        fields={[
          'id',
          'country',
          'start_date',
          'end_date',
          'reasoning_date',
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

CountrySanctionList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default CountrySanctionList;
