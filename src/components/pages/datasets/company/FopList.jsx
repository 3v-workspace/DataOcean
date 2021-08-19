import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils';


const FopList = () => {
  const { t } = useTranslation();
  const columns = [
    {
      header: t('fullName'),
      defaultSelected: true,
      prop: 'fullname',
      width: '30%',
    },
    {
      header: t('status'),
      defaultSelected: true,
      prop: 'status',
      width: '15%',
    },
    {
      header: t('address'),
      defaultSelected: true,
      prop: 'address',
      width: '35%',
    },
    {
      header: t('registrationDate'),
      defaultSelected: true,
      prop: 'registration_date',
      width: '10%',
      render: (v) => dateFormat(v),
    },
    {
      header: t('terminationDate'),
      defaultSelected: true,
      prop: 'termination_date',
      width: '10%',
      render: (v) => dateFormat(v),
    },
  ];
  return (
    <PageBox noBox>
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
