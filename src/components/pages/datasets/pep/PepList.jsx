import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { renderDate, getLocaleField } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';

const PepList = ({ match, history }) => {
  const { t, i18n } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      width: '5%',
      noSort: true,
      defaultSelected: true,
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
      render: (v, row) => getLocaleField(row, 'fullname'),
    },
    {
      header: t('dateOfBirth'),
      defaultSelected: true,
      prop: 'date_of_birth',
      width: '5%',
      noSort: true,
      render: (v) => renderDate(v),
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
          { value: '1', label: t('politicallyExposedPerson') },
          { value: '0', label: t('notPoliticallyExposedPerson') },
        ],
      },
    },
    {
      header: t('pepType'),
      prop: 'pep_type_display',
      width: '20%',
      noSort: true,
      defaultSelected: true,
      filter: {
        name: 'pep_type',
        type: 'select',
        multiple: true,
        options: [
          { value: 'national PEP', label: t('pepTypes.nationalPEP') },
          { value: 'foreign PEP', label: t('pepTypes.foreignPEP') },
          { value: 'PEP with political functions in international organization', label: t('pepTypes.PEPwithPoliticalFunctions') },
          { value: 'associated person with PEP', label: t('pepTypes.associatedPersonWithPEP') },
          { value: 'member of PEP`s family', label: t('pepTypes.familyMemberOfPEP') },
        ],
      },
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
      render: (v, row) => getLocaleField(row, 'last_job_title'),
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
      render: (v, row) => getLocaleField(row, 'last_employer'),
    },
    {
      header: t('lastUpdated'),
      prop: 'updated_at',
      width: '10%',
      defaultSelected: true,
      render: (v) => renderDate(v),
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
        minHeight="400px"
      />
    </PageBox>
  );
};

PepList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PepList;
