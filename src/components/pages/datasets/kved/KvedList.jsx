import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';

const KvedList = () => {
  const { t, i18n } = useTranslation();
  const columns = [
    {
      header: t('code'),
      defaultSelected: true,
      prop: 'code',
      width: '4%',
    },
    {
      header: t('class'),
      defaultSelected: true,
      prop: i18n.language === 'uk' ? 'name' : 'name_en',
      width: '24%',
    },
    {
      header: t('group'),
      defaultSelected: true,
      prop: 'group',
      width: '24%',
    },
    {
      header: t('division'),
      defaultSelected: true,
      prop: 'division',
      width: '24%',
    },
    {
      header: t('section'),
      defaultSelected: true,
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
