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
      defaultSelected: true,
      noSort: true,
      prop: 'id',
    },
    {
      header: t('countryName'),
      defaultSelected: true,
      prop: 'country',
      filter: {
        name: 'country',
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
      header: t('reasoningDate'),
      defaultSelected: true,
      noSort: true,
      prop: 'reasoning_date',
      render: (v) => renderDate(v),
    },
    {
      header: t('cancellationCondition'),
      noSort: true,
      prop: 'cancellation_condition',
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
