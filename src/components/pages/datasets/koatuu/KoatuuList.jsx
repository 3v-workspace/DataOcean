import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const KoatuuList = () => {
  const { t } = useTranslation();

  const columns = [
    { header: t('code'), prop: 'code' },
    { header: t('name'), prop: 'name', render: (value) => (value === 'empty field' ? '' : value) },
    { header: t('Районна рада'), prop: 'third_level', render: (value) => (value === 'empty field' ? '' : value) },
    { header: t('district'), prop: 'second_level', render: (value) => (value === 'empty field' ? '' : value) },
    { header: t('region'), prop: 'first_level', render: (value) => (value === 'empty field' ? '' : value) },
  ];

  return (
    <PageBox header={t('viewTheRegistry')} noBox>
      <Table
        columns={columns}
        url="koatuu-fourth-level/"
      />
    </PageBox>
  );
};

// StreetList.propTypes = {};

export default KoatuuList;
