import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const StreetList = () => {
  const { t } = useTranslation();

  const columns = [
    { header: t('name'), prop: 'name' },
    { header: t('locality'), prop: 'city', render: (value) => (value === 'empty field' ? '' : value) },
    { header: t('district'), prop: 'district', render: (value) => (value === 'empty field' ? '' : value) },
    { header: t('region'), prop: 'region', render: (value) => (value === 'empty field' ? '' : value) },
  ];

  return (
    <PageBox header={t('viewTheRegistry')} noBox>
      <Table
        columns={columns}
        url="street/"
      />
    </PageBox>
  );
};

// StreetList.propTypes = {};

export default StreetList;
