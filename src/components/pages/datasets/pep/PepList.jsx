import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';


const PepList = () => {
  const { t } = useTranslation();
  const columns = [
    { header: t('fullName'), prop: 'fullname' },
    { header: t('status'), prop: 'is_pep', render: (v) => (v ? 'Є публічним діячем' : 'Не є публічним діячем') },
    { header: t('pepType'), prop: 'pep_type' },
    { header: t('lastPosition'), prop: 'last_job_title' },
    { header: t('lastPlaceOfWork'), prop: 'last_employer' },
  ];
  return (
    <PageBox header={t('viewTheRegistry')} noBox>
      <Table
        columns={columns}
        url="pep/"
        fields={[
          'id',
          'fullname',
          'is_pep',
          'pep_type',
          'last_job_title',
          'last_employer',
        ]}
      />
    </PageBox>
  );
};

// CompanyList.propTypes = {};

export default PepList;
