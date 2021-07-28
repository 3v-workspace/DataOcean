import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { DateFormat, upFirstLetter } from 'utils';


const CompanySanctionList = ({ match, history }) => {
  const { t, i18n } = useTranslation();
  const columns = [
    {
      header: 'ID',
      prop: 'id',
      width: '5%',
      noSort: true,
    },
    {
      header: t('companyName'),
      prop: 'name',
      width: '20%',
    },
    {
      header: t('startDate'),
      prop: 'start_date',
      width: '20%',
      render: (v) => (DateFormat(v, i18n.language)),
    },
    {
      header: t('endDate'),
      prop: 'end_date',
      width: '15%',
      render: (v) => (DateFormat(v, i18n.language)),
    },
    {
      header: t('taxpayerNumber'),
      prop: 'taxpayer_number',
      width: '20%',
      noSort: true,
    },
    {
      header: t('registrationNumber'),
      prop: 'registration_number',
      width: '20%',
      noSort: true,
    },
    {
      header: t('countryOfRegistration'),
      prop: 'country_of_registration',
      width: '20%',
      noSort: true,
      render: (country) => upFirstLetter(country[`name_${i18n.language}`]),
    },
  ];
  return (
    <PageBox noBox>
      <Table
        columns={columns}
        url="sanction/company/"
        fields={[
          'id',
          'name',
          'start_date',
          'end_date',
          'taxpayer_number',
          'registration_number',
          'country_of_registration',
        ]}
        axiosConfigs={{ useProjectToken: true }}
        onRowClick={(row) => {
          history.push(`${match.url}${row.id}/`);
        }}
      />
    </PageBox>
  );
};

CompanySanctionList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default CompanySanctionList;
