import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { renderDate, upFirstLetter } from 'utils';


const CompanySanctionList = ({ match, history }) => {
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
      header: t('companyName'),
      defaultSelected: true,
      prop: 'name',
      width: '20%',
    },
    {
      header: t('startDate'),
      defaultSelected: true,
      prop: 'start_date',
      width: '20%',
      render: (v) => renderDate(v),
    },
    {
      header: t('endDate'),
      defaultSelected: true,
      prop: 'end_date',
      width: '15%',
      render: (v) => renderDate(v),
    },
    {
      header: t('taxpayerNumber'),
      defaultSelected: true,
      prop: 'taxpayer_number',
      width: '20%',
      noSort: true,
    },
    {
      header: t('registrationNumber'),
      defaultSelected: true,
      prop: 'registration_number',
      width: '20%',
      noSort: true,
    },
    {
      header: t('countryOfRegistration'),
      defaultSelected: true,
      prop: 'country_of_registration',
      width: '20%',
      noSort: true,
      render: (country) => {
        if (country) {
          country = upFirstLetter(country[`name_${i18n.language}`]);
        }
        return country;
      },
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
