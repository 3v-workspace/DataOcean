import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormatISO } from 'utils';

const PepList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      width: '5%',
      noSort: true,
      filter: {
        name: 'id',
        type: 'number',
        placeholder: '12345',
      },
    },
    {
      header: t('fullName'),
      prop: 'fullname',
      width: '20%',
      filter: {
        name: 'fullname',
        type: 'text',
      },
    },
    {
      header: t('dateOfBirth'),
      prop: 'date_of_birth',
      width: '5%',
      noSort: true,
      filter: {
        name: 'date_of_birth',
        type: 'text',
        placeholder: '1989-02-11',
      },
    },
    {
      header: t('lastUpdated'),
      prop: 'updated_at',
      width: '10%',
      render: (v) => dateFormatISO(v),
      filter: {
        name: 'updated_at_date',
        type: 'date',
        placeholder: '2020-08-27',
      },
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
      filter: {
        name: 'last_job_title',
        type: 'text',
      },
    },
    {
      header: t('lastPlaceOfWork'),
      prop: 'last_employer',
      width: '20%',
      filter: {
        name: 'last_employer',
        type: 'text',
      },
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
          'date_of_birth',
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
