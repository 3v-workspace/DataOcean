import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { DateFormat } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';

const PepList = ({ match, history }) => {
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
      prop: i18n.language === 'uk' ? 'fullname' : 'fullname_en',
      width: '20%',
      filter: {
        name: i18n.language === 'uk' ? 'fullname' : 'fullname_en',
        type: 'text',
      },
    },
    {
      header: t('dateOfBirth'),
      prop: 'date_of_birth',
      width: '5%',
      noSort: true,
      render: (v) => (DateFormat(v, i18n.language)),
      filter: {
        name: 'date_of_birth',
        type: 'text',
        placeholder: '1989-02-11',
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
      prop: 'pep_type_display',
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
    {
      header: t('lastUpdated'),
      prop: 'updated_at',
      width: '10%',
      render: (v) => (DateFormat(v, i18n.language)),
      filter: {
        name: 'updated_at_date',
        type: 'date',
        placeholder: '2020-08-27',
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
          'fullname_en',
          'date_of_birth',
          'is_pep',
          'pep_type_display',
          'last_job_title',
          'last_job_title_en',
          'last_employer',
          'last_employer_en',
          'updated_at',
          'created_at',
        ]}
        axiosConfigs={{ useProjectToken: true }}
        onRowClick={(row) => {
          history.push(`${match.url}${row.id}/`);
        }}
        exportUrl="pep/xlsx/"
      />
    </PageBox>
  );
};

PepList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PepList;
