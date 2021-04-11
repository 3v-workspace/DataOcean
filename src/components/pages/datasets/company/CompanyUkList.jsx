import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const CompanyUkList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('companyID'),
      prop: 'edrpou',
      width: '5%',
    },
    {
      header: t('name'),
      prop: 'name',
      width: '35%',
    },
    {
      header: t('status'),
      prop: 'status',
      width: '10%',
    },
    {
      header: t('address'),
      prop: 'address',
      width: '40%',
    },
    {
      header: t('authorizedCapital'),
      prop: 'authorized_capital',
      width: '10%',
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="company/uk/"
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

export default CompanyUkList;
