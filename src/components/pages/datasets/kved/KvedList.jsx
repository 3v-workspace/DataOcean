import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const KvedList = () => {
  const { t } = useTranslation();
  const columns = [
    { header: t('code'), prop: 'code' },
    { header: t('name'), prop: 'name' },
    { header: t('group'), prop: 'group' },
    { header: t('division'), prop: 'division' },
    { header: t('section'), prop: 'section' },
  ];
  return (
    <PageBox header={t('viewTheRegistry')} noBox>
      <Table
        columns={columns}
        url="kved/"
      />
    </PageBox>
  );
};

// KvedList.propTypes = {};

export default KvedList;
