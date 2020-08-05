import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';


const columns = [
  { header: 'ЄДРПОУ', prop: 'edrpou' },
  { header: 'Назва', prop: 'name' },
  { header: 'Статус', prop: 'status' },
  { header: 'Адреса', prop: 'address' },
  { header: 'Статутний капітал', prop: 'authorized_capital' },
];


const CompanyList = () => (
  <PageBox header="Перегляд реєстру" noBox>
    <Table
      columns={columns}
      url="company/"
    />
  </PageBox>
);

CompanyList.propTypes = {};

export default CompanyList;
