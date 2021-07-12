import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormatISO } from 'utils';

const PepList = () => {
  const { t, i18n } = useTranslation();
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
        width: '20',
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
      prop: i18n.language === 'uk' ? 'last_job_title' : 'last_job_title_en',
      width: '20%',
      filter: i18n.language === 'uk' ? {
        name: 'last_job_title',
        type: 'text',
      } : null,
    },
    {
      header: t('lastPlaceOfWork'),
      prop: i18n.language === 'uk' ? 'last_employer' : 'last_employer_en',
      width: '20%',
      filter: i18n.language === 'uk' ? {
        name: 'last_employer',
        type: 'text',
      } : null,
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
          'last_job_title_en',
          'last_employer',
          'last_employer_en',
          'updated_at',
        ]}
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default PepList;
