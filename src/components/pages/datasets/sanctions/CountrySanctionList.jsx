import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormat, upFirstLetter } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';

const CountrySanctionList = ({ match, history }) => {
  const { t } = useTranslation();
  const columns = [
    {
      header: 'ID',
      defaultSelected: true,
      prop: 'id',
      width: '5%',
      noSort: true,
    },
    {
      header: t('countryName'),
      defaultSelected: true,
      prop: 'country',
      width: '20%',
      render: (v) => upFirstLetter(v),
    },
    {
      header: t('startDate'),
      defaultSelected: true,
      prop: 'start_date',
      width: '20%',
      render: (v) => dateFormat(v),
    },
    {
      header: t('endDate'),
      defaultSelected: true,
      prop: 'end_date',
      width: '15%',
      render: (v) => dateFormat(v),
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
