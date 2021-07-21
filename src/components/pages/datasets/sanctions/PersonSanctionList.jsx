import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { dateFormatISO } from 'utils';


const PersonSanctionList = ({ match, history }) => {
  const { t, i18n } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      width: '5%',
      noSort: true,
    },
    {
      header: t('fullName'),
      prop: 'full_name',
      width: '20%',
    },
    {
      header: t('dateOfBirth'),
      prop: 'date_of_birth',
      width: '5%',
      noSort: true,
      render: (v) => (v ? dateFormatISO(v) : '---'),
    },
    {
      header: t('startDate'),
      prop: 'start_date',
      width: '20%',
      render: (v) => dateFormatISO(v),
    },
    {
      header: t('endDate'),
      prop: 'end_date',
      width: '15%',
      render: (v) => dateFormatISO(v),
    },
    {
      header: t('taxpayerNumber'),
      prop: 'taxpayer_number',
      width: '20%',
      noSort: true,
    },
    {
      header: t('countriesOfCitizenship'),
      prop: 'countries_of_citizenship',
      width: '20%',
      noSort: true,
      render: (countries) => countries.map((country) => country[`name_${i18n.language}`]).join(', '),
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="sanction/person/"
        fields={[
          'id',
          'full_name',
          'date_of_birth',
          'start_date',
          'end_date',
          'taxpayer_number',
          'countries_of_citizenship',
        ]}
        axiosConfigs={{ useProjectToken: true }}
        onRowClick={(row) => {
          history.push(`${match.url}${row.id}/`);
        }}
      />
    </PageBox>
  );
};

PersonSanctionList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PersonSanctionList;
