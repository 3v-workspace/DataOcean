import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const KvedList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('code'),
      prop: 'code',
      width: '4%',
    },
    {
      header: t('name'),
      prop: 'name',
      width: '24%',
    },
    {
      header: t('group'),
      prop: 'group',
      width: '24%',
    },
    {
      header: t('division'),
      prop: 'division',
      width: '24%',
    },
    {
      header: t('section'),
      prop: 'section',
      width: '24%',
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="kved/"
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// KvedList.propTypes = {};

export default KvedList;
