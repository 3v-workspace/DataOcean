import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormatISO } from 'utils';


const CountrySanctionList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      width: '5%',
      noSort: true,
    },
    {
      header: t('countryName'),
      prop: 'country',
      width: '20%',
    },
    {
      header: t('startDate'),
      prop: 'start_date',
      width: '20%',
      render: (v) => dateFormatISO(v),
    },
    {
      header: t('endDate'),
      prop: 'end_date',
      width: '15%',
      render: (v) => dateFormatISO(v),
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
      />
    </PageBox>
  );
};

export default CountrySanctionList;
