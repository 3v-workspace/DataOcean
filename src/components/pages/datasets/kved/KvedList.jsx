import React from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';


const columns = [
  { header: 'Код', prop: 'code' },
  { header: 'Назва', prop: 'name' },
  { header: 'Група', prop: 'group' },
  { header: 'Розділ', prop: 'division' },
  { header: 'Підрозділ', prop: 'section' },
];


const KvedList = (props) => (
  <PageBox header="Перегляд реєстру" noBox>
    <Table
      columns={columns}
      url="kved/"
    />
  </PageBox>
);

KvedList.propTypes = {};

export default KvedList;
