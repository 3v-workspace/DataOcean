import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const KoatuuList = () => {
  const { t } = useTranslation();
  const columns = [
    { header: t('code'), prop: 'code' },
    { header: t('name'), prop: 'name' },
    { header: t('koatuuThirdLevel'), prop: 'third_level' },
    { header: t('koatuuSecondLevel'), prop: 'second_level' },
    { header: t('koatuuFirstLevel'), prop: 'first_level' },
  ];

  return (
    <PageBox header={t('viewTheRegistry')} noBox>
      <Table
        columns={columns}
        url="koatuu-fourth-level/"
        fields={[
          'id',
          'code',
          'name',
          'third_level',
          'second_level',
          'first_level',
          'fourth-level',
        ]}
        axiosConfigs={{ useProjectToken: true }}

      />
    </PageBox>
  );
};

// KoatuuList.propTypes = {};

export default KoatuuList;
