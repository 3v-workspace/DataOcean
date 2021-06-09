import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils';


const PersonSanctionList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      width: '5%',
      noSort: true,
    },
    {
      header: t('fullName'),
      prop: 'full_name',
      width: '20%',
    },
    {
      header: t('dateOfBirth'),
      prop: 'date_of_birth',
      width: '5%',
      render: (v) => dateFormat(v),
    },
    {
      header: t('startDate'),
      prop: 'start_date',
      width: '20%',
      render: (v) => dateFormat(v),
    },
    {
      header: t('endDate'),
      prop: 'end_date',
      width: '15%',
      render: (v) => dateFormat(v),
    },
    {
      header: t('taxpayerNumber'),
      prop: 'taxpayer_number',
      width: '20%',
    },
    {
      header: t('countriesOfCitizenship'),
      prop: 'countries_of_citizenship',
      width: '20%',
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="sanction/person/"
        fields={[
          'id',
          'full_name',
          'date_of_birth',
          'start_date',
          'end_date',
          'taxpayer_number',
          'countries_of_citizenship',
        ]}
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default PersonSanctionList;
