import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';


const columns = [
  { header: 'Назва', prop: 'name' },
  { header: 'Населений пункт', prop: 'city' },
  { header: 'Район', prop: 'district', render: (value) => (value === 'empty field' ? '' : value) },
  { header: 'Регіон', prop: 'region' },
];


const StreetList = () => (
  <PageBox header="Перегляд реєстру" noBox>
    <Table
      columns={columns}
      url="street/"
    />
  </PageBox>
);

StreetList.propTypes = {};

export default StreetList;
