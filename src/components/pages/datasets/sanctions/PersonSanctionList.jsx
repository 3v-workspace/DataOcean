import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { renderDate, upFirstLetter } from 'utils';


const PersonSanctionList = ({ match, history }) => {
  const { t, i18n } = useTranslation();
  const columns = [
    {
      header: 'ID',
      defaultSelected: true,
      prop: 'id',
      width: '5%',
      noSort: true,
    },
    {
      header: t('fullName'),
      defaultSelected: true,
      prop: 'full_name',
      width: '20%',
    },
    {
      header: t('dateOfBirth'),
      defaultSelected: true,
      prop: 'date_of_birth',
      width: '17%',
      noSort: true,
      render: (v) => renderDate(v),
    },
    {
      header: t('startDate'),
      defaultSelected: true,
      prop: 'start_date',
      width: '17%',
      render: (v) => renderDate(v),
    },
    {
      header: t('endDate'),
      defaultSelected: true,
      prop: 'end_date',
      width: '17%',
      render: (v) => renderDate(v),
    },
    {
      header: t('taxpayerNumber'),
      defaultSelected: true,
      prop: 'taxpayer_number',
      width: '10%',
      noSort: true,
    },
    {
      header: t('countriesOfCitizenship'),
      defaultSelected: true,
      prop: 'countries_of_citizenship',
      width: '19%',
      noSort: true,
      render: (countries) => countries.map((country) => upFirstLetter(country[`name_${i18n.language}`])).join(', '),
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
