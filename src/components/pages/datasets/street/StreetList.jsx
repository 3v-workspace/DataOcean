import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const StreetList = () => {
  const { t } = useTranslation();

  const columns = [
    {
      header: t('name'),
      defaultSelected: true,
      prop: 'name',
      width: '25%',
    },
    {
      header: t('locality'),
      defaultSelected: true,
      prop: 'city',
      width: '25%',
      render: (value) => (value === 'empty field' ? '' : value),
    },
    {
      header: t('district'),
      defaultSelected: true,
      prop: 'district',
      width: '25%',
      render: (value) => (value === 'empty field' ? '' : value),
    },
    {
      header: t('region'),
      defaultSelected: true,
      prop: 'region',
      width: '25%',
      render: (value) => (value === 'empty field' ? '' : value),
    },
  ];

  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="street/"
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// StreetList.propTypes = {};

export default StreetList;
