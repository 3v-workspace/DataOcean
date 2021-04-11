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
      prop: 'name',
      width: '25%',
    },
    {
      header: t('locality'),
      prop: 'city',
      width: '25%',
      render: (value) => (value === 'empty field' ? '' : value),
    },
    {
      header: t('district'),
      prop: 'district',
      width: '25%',
      render: (value) => (value === 'empty field' ? '' : value),
    },
    {
      header: t('region'),
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
