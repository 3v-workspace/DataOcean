import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const FopList = () => {
  const { t } = useTranslation();
  const columns = [
    { header: t('fullName'), prop: 'fullname' },
    { header: t('status'), prop: 'status' },
    { header: t('address'), prop: 'address' },
    { header: t('registrationDate'), prop: 'registration_date' },
    { header: t('terminationDate'), prop: 'termination_date' },
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
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default FopList;
