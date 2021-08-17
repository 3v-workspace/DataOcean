import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const KoatuuList = () => {
  const { t } = useTranslation();

  const columns = [
    {
      header: t('code'),
      defaultSelected: true,
      prop: 'code',
      width: '10%',
    },
    {
      header: t('name'),
      defaultSelected: true,
      prop: 'name',
      width: '20%',
    },
    {
      header: t('thirdLevelOfSubordination'),
      defaultSelected: true,
      prop: 'third_level',
      width: '20%',
    },
    {
      header: t('secondLevelOfSubordination'),
      defaultSelected: true,
      prop: 'second_level',
      width: '20%',
    },
    {
      header: t('firstLevelOfSubordination'),
      defaultSelected: true,
      prop: 'first_level',
      width: '20%',
    },
  ];

  return (
    <PageBox noBox>
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
