import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { getLocaleField } from 'utils';


const KvedList = () => {
  const { t } = useTranslation();
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
      prop: 'name',
      render: (v, row) => getLocaleField(row, 'name'),
      width: '24%',
    },
    {
      header: t('group'),
      defaultSelected: true,
      prop: 'group',
      render: (v, row) => getLocaleField(row, 'group'),
      width: '24%',
    },
    {
      header: t('division'),
      defaultSelected: true,
      prop: 'division',
      render: (v, row) => getLocaleField(row, 'division'),
      width: '24%',
    },
    {
      header: t('section'),
      defaultSelected: true,
      prop: 'section',
      render: (v, row) => getLocaleField(row, 'section'),
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
