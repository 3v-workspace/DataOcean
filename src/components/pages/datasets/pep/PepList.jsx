import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormatISO } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';
import getLocaleFields from 'const/getLocaleField';

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
        width: '24',
      },
    },
    {
      header: t('fullName'),
      defaultSelected: true,
      prop: 'fullname',
      width: '20%',
      filter: {
        name: i18n.language === 'uk' ? 'fullname' : 'fullname_en',
        type: 'text',
      },
      render: (v, row) => getLocaleFields(row, 'fullname'),
    },
    {
      header: t('dateOfBirth'),
      defaultSelected: true,
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
      header: t('status'),
      defaultSelected: true,
      prop: 'is_pep',
      width: '15%',
      render: (v) => (v ? t('politicallyExposedPerson') : t('notPoliticallyExposedPerson')),
      filter: {
        name: 'is_pep',
        type: 'select',
        options: [
          { value: '0', label: t('notPoliticallyExposedPerson') },
          { value: '1', label: t('politicallyExposedPerson') },
        ],
      },
    },
    {
      header: t('pepType'),
      prop: 'pep_type_display',
      width: '20%',
      noSort: true,
    },
    {
      header: t('lastPosition'),
      defaultSelected: true,
      prop: 'last_job_title',
      width: '20%',
      filter: i18n.language === 'uk' ? {
        name: 'last_job_title',
        type: 'text',
      } : null,
      render: (v, row) => getLocaleFields(row, 'last_job_title'),
    },
    {
      header: t('lastPlaceOfWork'),
      defaultSelected: true,
      prop: 'last_employer',
      width: '20%',
      filter: i18n.language === 'uk' ? {
        name: 'last_employer',
        type: 'text',
      } : null,
      render: (v, row) => getLocaleFields(row, 'last_employer'),
    },
    {
      header: t('lastUpdated'),
      prop: 'updated_at',
      width: '10%',
      render: (v) => dateFormatISO(v),
      filter: {
        name: 'updated_at_date',
        type: 'text',
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
