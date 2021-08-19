import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const CompanyUkrList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('edrpou'),
      defaultSelected: true,
      prop: 'edrpou',
      width: '7%',
    },
    {
      header: t('name'),
      defaultSelected: true,
      prop: 'name',
      width: '30%',
    },
    {
      header: t('status'),
      defaultSelected: true,
      prop: 'status',
      width: '15%',
    },
    {
      header: t('address'),
      defaultSelected: true,
      prop: 'address',
      width: '40%',
    },
    {
      header: t('authorizedCapital'),
      defaultSelected: true,
      prop: 'authorized_capital',
      width: '7%',
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="company/ukr/"
        fields={[
          'id',
          'edrpou',
          'name',
          'status',
          'address',
          'authorized_capital',
        ]}
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default CompanyUkrList;
