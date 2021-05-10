import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils';


const PepList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('fullName'),
      prop: 'fullname',
      width: '25%',
    },
    {
      header: t('lastUpdated'),
      prop: 'updated_at',
      width: '20%',
      render: (v) => dateFormat(v),
    },
    {
      header: t('status'),
      prop: 'is_pep',
      width: '15%',
      render: (v) => (v ? t('politicallyExposedPerson') : t('notPoliticallyExposedPerson')),
    },
    {
      header: t('pepType'),
      prop: 'pep_type',
      width: '20%',
    },
    {
      header: t('lastPosition'),
      prop: 'last_job_title',
      width: '20%',
    },
    {
      header: t('lastPlaceOfWork'),
      prop: 'last_employer',
      width: '20%',
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="pep/"
        fields={[
          'id',
          'fullname',
          'is_pep',
          'pep_type',
          'last_job_title',
          'last_employer',
          'updated_at',
        ]}
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default PepList;
