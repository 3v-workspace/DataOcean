import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const FopList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('fullName'),
      prop: 'fullname',
      width: '30%',
    },
    {
      header: t('status'),
      prop: 'status',
      width: '15%',
    },
    {
      header: t('address'),
      prop: 'address',
      width: '35%',
    },
    {
      header: t('registrationDate'),
      prop: 'registration_date',
      width: '10%',
    },
    {
      header: t('terminationDate'),
      prop: 'termination_date',
      width: '10%',
    },
  ];
  return (
    <PageBox header={t('viewTheRegistry')} noBox>
      <Table
        columns={columns}
        url="fop/"
        fields={[
          'id',
          'fullname',
          'status',
          'address',
          'registration_date',
          'termination_date',
        ]}
        axiosConfigs={{ useProjectToken: true }}
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default FopList;
